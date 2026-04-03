#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const logPath = path.join(root, 'logs', 'bertlclaw-operations.log');
const bugsPath = path.join(root, 'bertlclaw-qa-active-bugs.csv');
const streamPath = path.join(root, 'qa-artifacts', 'stream-status', 'latest.json');
const priorityPath = path.join(root, 'qa-artifacts', 'priority-board', 'latest.json');
const opsPath = path.join(root, 'qa-artifacts', 'ops-control', 'latest.json');
const outDir = path.join(root, 'qa-artifacts', 'hour-slot-bridge');
const latestJsonPath = path.join(outDir, 'latest.json');
const latestMdPath = path.join(outDir, 'latest.md');
const historyPath = path.join(outDir, 'history.json');

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
}

function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (ch !== '\r') {
      field += ch;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  if (!rows.length) return [];
  const headers = rows[0];
  return rows.slice(1).filter(r => r.some(Boolean)).map(r => Object.fromEntries(headers.map((h, i) => [h, r[i] || ''])));
}

function viennaParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Vienna',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(date).filter(part => part.type !== 'literal').map(part => [part.type, part.value]),
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
    date: `${parts.year}-${parts.month}-${parts.day}`,
    stamp: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CEST`,
    hourSlot: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:00 CEST`,
  };
}

function parseViennaLine(line) {
  const match = String(line).match(/^\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}) CEST\]\s*(.*)$/);
  if (!match) return null;
  const [, year, month, day, hour, minute, message] = match;
  const localDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), 0);
  return {
    raw: line,
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hour: Number(hour),
    minute: Number(minute),
    message,
    date: `${year}-${month}-${day}`,
    stamp: `${year}-${month}-${day} ${hour}:${minute} CEST`,
    slot: `${year}-${month}-${day} ${hour}:00 CEST`,
    dateObj: localDate,
  };
}

function oneLine(text, max = 180) {
  if (!text) return 'none';
  const clean = String(text).replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

function summarizeBugMap(bugs) {
  const result = {};
  for (const bug of bugs) {
    result[bug.bug_id] = {
      status: bug.status,
      severity: bug.severity,
      title: bug.title,
      next_action: bug.next_action,
      needs_manual_access: bug.needs_manual_access,
    };
  }
  return result;
}

function diffBugMaps(previous = {}, current = {}) {
  const changes = [];
  const ids = Array.from(new Set([...Object.keys(previous), ...Object.keys(current)])).sort();
  for (const id of ids) {
    const before = previous[id];
    const after = current[id];
    if (!before && after) {
      changes.push(`${id} entered scope as ${after.status}`);
      continue;
    }
    if (before && !after) {
      changes.push(`${id} left active scope from ${before.status}`);
      continue;
    }
    if (before && after && before.status !== after.status) {
      changes.push(`${id} ${before.status} → ${after.status}`);
    }
  }
  return changes;
}

function countByStatus(bugs) {
  return bugs.reduce((acc, bug) => {
    acc[bug.status] = (acc[bug.status] || 0) + 1;
    return acc;
  }, {});
}

const history = readJson(historyPath, []);
const bugs = parseCsv(readText(bugsPath));
const stream = readJson(streamPath, {});
const priority = readJson(priorityPath, {});
const ops = readJson(opsPath, {});
const now = new Date();
const nowParts = viennaParts(now);
const currentSlot = nowParts.hourSlot;
const previousSlotDate = new Date(now.getTime() - 60 * 60 * 1000);
const previousSlot = viennaParts(previousSlotDate).hourSlot;
const activeBugs = bugs.filter(bug => !['closed', 'retested_pass'].includes(bug.status));
const ready = activeBugs.filter(bug => bug.status === 'ready_for_retest');
const blocked = activeBugs.filter(bug => bug.needs_manual_access === 'yes' || bug.status === 'blocked_manual_access');
const logs = readText(logPath)
  .split(/\r?\n/)
  .filter(Boolean)
  .map(parseViennaLine)
  .filter(Boolean);

const currentSlotLogs = logs.filter(entry => entry.slot === currentSlot);
const previousSlotLogs = logs.filter(entry => entry.slot === previousSlot);

const snapshot = {
  captured_at: nowParts.stamp,
  slot: currentSlot,
  headline_status: stream.headline_status || 'unknown',
  ready_for_retest_count: priority.totals?.ready_for_retest ?? ready.length,
  manual_blockers_count: priority.totals?.manual_blockers ?? blocked.length,
  missing_hourly_slots_count: stream.stream_health?.missing_hourly_slots_count ?? null,
  active_bug_map: summarizeBugMap(activeBugs),
  log_evidence_count: currentSlotLogs.length,
};

const priorSnapshot = history.find(item => item && item.slot !== currentSlot) || null;
const bugStatusChanges = priorSnapshot ? diffBugMaps(priorSnapshot.active_bug_map || {}, snapshot.active_bug_map) : [];

const evidenceLines = currentSlotLogs.map(entry => `- ${entry.stamp} — ${oneLine(entry.message, 220)}`);
const previousEvidenceLines = previousSlotLogs.map(entry => `- ${entry.stamp} — ${oneLine(entry.message, 220)}`);

const narrationAnchors = [];
const meaningfulCurrentLogs = currentSlotLogs.filter(entry => !entry.message.startsWith('hourly update due/recorded'));
for (const entry of meaningfulCurrentLogs.slice(-3)) {
  narrationAnchors.push(oneLine(entry.message, 180));
}
for (const change of bugStatusChanges.slice(0, 3)) {
  if (!narrationAnchors.includes(change)) narrationAnchors.push(change);
}
if (!narrationAnchors.length && currentSlotLogs.length) {
  narrationAnchors.push(...currentSlotLogs.slice(-2).map(entry => oneLine(entry.message, 180)));
}
if (!narrationAnchors.length) {
  narrationAnchors.push('No current-slot evidence lines yet; do not overstate this hour without adding a fresh log or snapshot.');
}

const driftSignals = [];
if (!currentSlotLogs.length) driftSignals.push('No QA/ops log evidence captured in the current hour slot yet.');
if ((stream.stream_health?.minutes_since_last_hourly_update ?? 0) > 65) driftSignals.push('Last hourly update is older than 65 minutes.');
if ((stream.stream_health?.missing_hourly_slots_count ?? 0) > 0) driftSignals.push(`${stream.stream_health.missing_hourly_slots_count} missing hourly slot(s) still visible in the audit chain.`);
if (!driftSignals.length) driftSignals.push('No immediate drift signal detected from slot evidence.');

const queueDelta = priorSnapshot
  ? {
      ready_for_retest: snapshot.ready_for_retest_count - (priorSnapshot.ready_for_retest_count || 0),
      manual_blockers: snapshot.manual_blockers_count - (priorSnapshot.manual_blockers_count || 0),
    }
  : null;

const report = {
  generated_at: nowParts.stamp,
  current_slot: currentSlot,
  previous_completed_slot: previousSlot,
  source_paths: {
    logPath,
    bugsPath,
    streamPath,
    priorityPath,
    opsPath,
  },
  slot_snapshot: snapshot,
  previous_snapshot: priorSnapshot ? {
    captured_at: priorSnapshot.captured_at,
    slot: priorSnapshot.slot,
    headline_status: priorSnapshot.headline_status,
    ready_for_retest_count: priorSnapshot.ready_for_retest_count,
    manual_blockers_count: priorSnapshot.manual_blockers_count,
    log_evidence_count: priorSnapshot.log_evidence_count,
  } : null,
  queue_delta_vs_previous_snapshot: queueDelta,
  bug_status_changes_vs_previous_snapshot: bugStatusChanges,
  current_slot_evidence: currentSlotLogs,
  previous_completed_slot_evidence: previousSlotLogs,
  narration_anchors: narrationAnchors,
  drift_signals: driftSignals,
  operator_hint: currentSlotLogs.length
    ? 'Use current_slot_evidence and narration_anchors first when filling "This hour done".'
    : 'Run after a real QA action/log entry or cite previous_completed_slot_evidence instead of inventing current-hour progress.',
};

const nextHistory = [snapshot, ...history.filter(item => item && item.slot !== currentSlot)].slice(0, 72);

const md = `# BertlClaw QA Hour-Slot Bridge\n\nGenerated: ${report.generated_at}\nCurrent slot: ${report.current_slot}\nPrevious completed slot: ${report.previous_completed_slot}\n\n## Why this exists\nThis bridge ties hourly narration to **real slot evidence** from the operations log plus the current QA queue state. Use it before sending a full-hour update when you want the \"This hour done\" section to be grounded in visible facts.\n\n## Current slot snapshot\n- Headline status: **${report.slot_snapshot.headline_status}**\n- Ready for retest: **${report.slot_snapshot.ready_for_retest_count}**\n- Manual blockers: **${report.slot_snapshot.manual_blockers_count}**\n- Current-slot evidence lines: **${report.slot_snapshot.log_evidence_count}**\n- Missing hourly slots in stream view: **${report.slot_snapshot.missing_hourly_slots_count ?? 'n/a'}**\n\n## Narration anchors for this hour\n${report.narration_anchors.map(item => `- ${item}`).join('\n')}\n\n## Drift signals\n${report.drift_signals.map(item => `- ${item}`).join('\n')}\n\n## Current slot evidence\n${evidenceLines.length ? evidenceLines.join('\n') : '- none yet in current slot'}\n\n## Previous completed slot evidence\n${previousEvidenceLines.length ? previousEvidenceLines.join('\n') : '- none visible in previous slot'}\n\n## Queue delta vs previous snapshot\n${report.queue_delta_vs_previous_snapshot
  ? `- Ready for retest delta: ${report.queue_delta_vs_previous_snapshot.ready_for_retest >= 0 ? '+' : ''}${report.queue_delta_vs_previous_snapshot.ready_for_retest}\n- Manual blockers delta: ${report.queue_delta_vs_previous_snapshot.manual_blockers >= 0 ? '+' : ''}${report.queue_delta_vs_previous_snapshot.manual_blockers}`
  : '- no previous snapshot yet'}\n\n## Bug status changes vs previous snapshot\n${report.bug_status_changes_vs_previous_snapshot.length ? report.bug_status_changes_vs_previous_snapshot.map(item => `- ${item}`).join('\n') : '- no visible status changes vs previous snapshot'}\n\n## Operator hint\n- ${report.operator_hint}\n`;

ensureDir(latestJsonPath);
fs.writeFileSync(latestJsonPath, JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(latestMdPath, md + '\n');
fs.writeFileSync(historyPath, JSON.stringify(nextHistory, null, 2) + '\n');
process.stdout.write(JSON.stringify(report, null, 2) + '\n');