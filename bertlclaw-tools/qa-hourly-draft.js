#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const controlTowerTool = path.join(root, 'bertlclaw-tools', 'qa-control-tower.js');
const priorityTool = path.join(root, 'bertlclaw-tools', 'qa-priority-board.js');
const bridgeTool = path.join(root, 'bertlclaw-tools', 'qa-hour-slot-bridge.js');
const streamPath = path.join(root, 'qa-artifacts', 'stream-status', 'latest.json');
const controlTowerPath = path.join(root, 'qa-artifacts', 'control-tower', 'latest.json');
const priorityPath = path.join(root, 'qa-artifacts', 'priority-board', 'latest.json');
const opsPath = path.join(root, 'qa-artifacts', 'ops-control', 'latest.json');
const bridgePath = path.join(root, 'qa-artifacts', 'hour-slot-bridge', 'latest.json');
const bugsPath = path.join(root, 'bertlclaw-qa-active-bugs.csv');
const outDir = path.join(root, 'qa-artifacts', 'hourly-update-draft');
const outJson = path.join(outDir, 'latest.json');
const outMd = path.join(outDir, 'latest.md');
const outTxt = path.join(outDir, 'latest.txt');

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
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
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
    second: parts.second,
    stamp: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CEST`,
    hourSlot: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:00 CEST`,
    hhSlot: `${parts.hour}:00 CEST`,
  };
}

function run(file, args = []) {
  execFileSync(process.execPath, [file, ...args], { cwd: root, stdio: 'pipe' });
}

function severityRank(value) {
  return { P0: 0, P1: 1, P2: 2, P3: 3 }[value] ?? 9;
}

function statusRank(value) {
  return {
    blocked_manual_access: 0,
    ready_for_retest: 1,
    retested_fail: 2,
    new: 3,
    partial: 4,
    in_progress: 5,
    retested_pass: 6,
    closed: 7,
  }[value] ?? 9;
}

function sortBugs(items) {
  return [...items].sort((a, b) => {
    const sev = severityRank(a.severity) - severityRank(b.severity);
    if (sev !== 0) return sev;
    const status = statusRank(a.status) - statusRank(b.status);
    if (status !== 0) return status;
    return String(a.bug_id || '').localeCompare(String(b.bug_id || ''));
  });
}

function shortOutcome(bug) {
  const code = bug.status === 'blocked_manual_access'
    ? 'BLOCKED'
    : bug.status === 'ready_for_retest'
      ? 'PARTIAL'
      : bug.status === 'retested_fail'
        ? 'FAIL'
        : bug.status === 'retested_pass'
          ? 'PASS'
          : 'OPEN';
  return `${bug.bug_id} -> ${code} — ${bug.actual || bug.title}`;
}

function oneLine(item, max = 160) {
  if (!item) return 'none';
  const clean = String(item).replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

function uniquePush(target, value) {
  const clean = oneLine(value, 170);
  if (clean !== 'none' && !target.includes(clean)) target.push(clean);
}

const args = process.argv.slice(2);
const refresh = args.includes('--refresh');
const hoursArg = args.find(arg => arg.startsWith('--hours='));
const hours = Math.max(1, Number(hoursArg ? hoursArg.split('=')[1] : 6) || 6);

if (refresh) {
  run(priorityTool);
  run(controlTowerTool, [`--hours=${hours}`]);
  run(bridgeTool);
}

const now = viennaParts();
const stream = readJson(streamPath, null);
const controlTower = readJson(controlTowerPath, null);
const priority = readJson(priorityPath, null);
const ops = readJson(opsPath, null);
const bridge = readJson(bridgePath, null);
const bugs = parseCsv(readText(bugsPath));

if (!stream || !controlTower || !priority || !ops) {
  process.stderr.write('Missing source artifacts. Run with --refresh or generate control/priority/stream/ops artifacts first.\n');
  process.exit(1);
}

const active = sortBugs(bugs.filter(bug => !['closed', 'retested_pass'].includes(bug.status)));
const ready = active.filter(bug => bug.status === 'ready_for_retest');
const blocked = active.filter(bug => bug.status === 'blocked_manual_access');
const failed = active.filter(bug => bug.status === 'retested_fail');
const newItems = active.filter(bug => bug.status === 'new');
const top = active.slice(0, 5);

const thisHourDone = [];
const bridgeAnchors = Array.isArray(bridge?.narration_anchors) ? bridge.narration_anchors : [];
const meaningfulBridgeEvidence = Array.isArray(bridge?.current_slot_evidence)
  ? bridge.current_slot_evidence.filter(item => item && !String(item.message || '').startsWith('hourly update due/recorded'))
  : [];

for (const anchor of bridgeAnchors) {
  if (thisHourDone.length >= 2) break;
  uniquePush(thisHourDone, anchor);
}
for (const evidence of meaningfulBridgeEvidence) {
  if (thisHourDone.length >= 2) break;
  uniquePush(thisHourDone, evidence.message);
}
for (const bug of [...ready.slice(0, 2), ...failed.slice(0, 1)]) {
  if (thisHourDone.length >= 2) break;
  uniquePush(thisHourDone, shortOutcome(bug));
}
uniquePush(thisHourDone, `QA control artifacts -> ${controlTower.overall_status === 'FAIL' ? 'ATTENTION' : 'DONE'} — control tower=${controlTower.overall_status}, ops=${ops.overall_status}, priority=${priority.generated_at || 'fresh'}`);

const openPressure = [];
if (blocked[0]) openPressure.push(`${blocked[0].bug_id} remains the top business blocker: ${oneLine(blocked[0].next_action)}`);
if (ready.length) openPressure.push(`Retest queue pressure: ${ready.length} item(s) ready for retest (${ready.slice(0, 4).map(item => item.bug_id).join(', ')})`);
if (controlTower.signals?.missing_hourly_slots?.length || ops.overall_status === 'FAIL') {
  openPressure.push(`Reporting reliability pressure: ${controlTower.signals?.missing_hourly_slots?.length || 0} missing hourly slot(s); ops status=${ops.overall_status}`);
}
if (!openPressure.length) openPressure.push('none');

const nextMoves = [];
for (const item of top) {
  if (nextMoves.length >= 3) break;
  nextMoves.push(`${item.bug_id}: ${oneLine(item.next_action, 140)}`);
}
if (!nextMoves.length) nextMoves.push('No active queue; hold the next full-hour slot and keep QA artifacts fresh.');

const dependency = blocked[0]
  ? oneLine(`${blocked[0].bug_id}: ${blocked[0].next_action}`)
  : 'none';

const draftText = `[${now.hourSlot}] QA hourly update\n\nStream:\n- Status: ${stream.headline_status}\n- Freshness: last run ${stream.stream_health?.minutes_since_last_run ?? 'n/a'} min ago, last hourly update ${stream.stream_health?.minutes_since_last_hourly_update ?? 'n/a'} min ago\n- Retest queue: ${priority.totals?.ready_for_retest ?? ready.length}\n- Manual blockers: ${priority.totals?.manual_blockers ?? blocked.length}\n\nThis hour done:\n- ${thisHourDone[0] || 'none'}\n- ${thisHourDone[1] || 'none'}\n- ${thisHourDone[2] || thisHourDone[1] || 'none'}\n\nOpen pressure now:\n- ${openPressure[0] || 'none'}\n- ${openPressure[1] || 'none'}\n- ${openPressure[2] || 'none'}\n\nNext before next full hour:\n1. ${nextMoves[0] || 'none'}\n2. ${nextMoves[1] || 'none'}\n3. ${nextMoves[2] || 'none'}\n\nAsk / dependency:\n- ${dependency}`;

const compactText = `[${now.hhSlot}] QA: status=${stream.headline_status}, queue=${priority.totals?.ready_for_retest ?? ready.length}, blockers=${priority.totals?.manual_blockers ?? blocked.length}. Done: ${oneLine(thisHourDone[0], 90)}, ${oneLine(thisHourDone[1], 90)}. Open: ${oneLine(openPressure[0], 100)}. Next: ${oneLine(nextMoves[0], 100)}. Need human: ${dependency}.`;

const report = {
  generated_at: now.stamp,
  slot: now.hourSlot,
  source_artifacts: {
    streamPath,
    controlTowerPath,
    priorityPath,
    opsPath,
    bridgePath,
    bugsPath,
  },
  source_generated_at: {
    stream: stream.stream_generated_at || stream.generated_at || null,
    control_tower: controlTower.generated_at || null,
    priority: priority.generated_at || null,
    ops: ops.generated_at || null,
    bridge: bridge?.generated_at || null,
  },
  stream: {
    status: stream.headline_status,
    last_run_minutes: stream.stream_health?.minutes_since_last_run ?? null,
    last_hourly_update_minutes: stream.stream_health?.minutes_since_last_hourly_update ?? null,
    retest_queue: priority.totals?.ready_for_retest ?? ready.length,
    manual_blockers: priority.totals?.manual_blockers ?? blocked.length,
  },
  this_hour_done: thisHourDone,
  open_pressure: openPressure,
  next_moves: nextMoves,
  dependency,
  draft_text: draftText,
  compact_text: compactText,
  notes: [
    bridge ? 'This helper now prefers hour-slot bridge anchors/evidence for the "This hour done" section before falling back to queue state.' : 'Hour-slot bridge artifact missing; this draft is falling back to queue-state heuristics for "This hour done".',
    'This helper drafts the update from current artifact state; it does not reconstruct precise per-hour change history.',
    'For the hardest hourly truth-check, run --refresh so control/priority/bridge artifacts are regenerated together.',
  ],
};

const md = `# BertlClaw QA Hourly Update Draft\n\nGenerated: ${report.generated_at}\nSlot: ${report.slot}\n\n## Copy-ready update\n\n\`\`\`text\n${report.draft_text}\n\`\`\`\n\n## Ultra-compact version\n\n\`\`\`text\n${report.compact_text}\n\`\`\`\n\n## Source freshness\n- Stream artifact: ${report.source_generated_at.stream || 'n/a'}\n- Control tower: ${report.source_generated_at.control_tower || 'n/a'}\n- Priority board: ${report.source_generated_at.priority || 'n/a'}\n- Ops control: ${report.source_generated_at.ops || 'n/a'}\n- Hour-slot bridge: ${report.source_generated_at.bridge || 'n/a'}\n\n## Operator notes\n${report.notes.map(item => `- ${item}`).join('\n')}\n`;

ensureDir(outJson);
fs.writeFileSync(outJson, JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(outMd, md + '\n');
fs.writeFileSync(outTxt, `${draftText}\n\n${compactText}\n`);
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
