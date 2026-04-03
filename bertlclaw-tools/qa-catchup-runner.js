#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const missedTool = path.join(root, 'bertlclaw-tools', 'qa-missed-slot-board.js');
const hourlyTool = path.join(root, 'bertlclaw-tools', 'qa-hourly-draft.js');
const bridgeTool = path.join(root, 'bertlclaw-tools', 'qa-hour-slot-bridge.js');
const missedPath = path.join(root, 'qa-artifacts', 'missed-slot-board', 'latest.json');
const hourlyPath = path.join(root, 'qa-artifacts', 'hourly-update-draft', 'latest.json');
const bridgePath = path.join(root, 'qa-artifacts', 'hour-slot-bridge', 'latest.json');
const logPath = path.join(root, 'logs', 'bertlclaw-operations.log');
const outDir = path.join(root, 'qa-artifacts', 'catchup-runner');
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

function run(file, args = []) {
  execFileSync(process.execPath, [file, ...args], { cwd: root, stdio: 'pipe' });
}

function viennaStamp(date = new Date()) {
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
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CEST`;
}

function parseViennaLine(line) {
  const bracketed = String(line).match(/^\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}) CEST\]\s*(.*)$/);
  if (bracketed) {
    const [, year, month, day, hour, minute, message] = bracketed;
    return {
      raw: line,
      slot: `${year}-${month}-${day} ${hour}:00`,
      stamp: `${year}-${month}-${day} ${hour}:${minute} CEST`,
      message,
    };
  }
  const piped = String(line).match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}) CEST \|\s*(.*)$/);
  if (piped) {
    const [, year, month, day, hour, minute, _second, message] = piped;
    return {
      raw: line,
      slot: `${year}-${month}-${day} ${hour}:00`,
      stamp: `${year}-${month}-${day} ${hour}:${minute} CEST`,
      message,
    };
  }
  return null;
}

function oneLine(value, max = 170) {
  if (!value) return 'none';
  const clean = String(value).replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

const args = process.argv.slice(2);
const refresh = args.includes('--refresh');
const hoursArg = args.find(arg => arg.startsWith('--hours='));
const limitArg = args.find(arg => arg.startsWith('--limit='));
const hours = Math.max(1, Number(hoursArg ? hoursArg.split('=')[1] : 8) || 8);
const limit = Math.max(1, Number(limitArg ? limitArg.split('=')[1] : 6) || 6);

if (refresh) {
  run(bridgeTool);
  run(hourlyTool, [`--refresh`, `--hours=${hours}`]);
  run(missedTool, [`--refresh`, `--hours=${hours}`]);
}

const missed = readJson(missedPath, null);
const hourly = readJson(hourlyPath, null);
const bridge = readJson(bridgePath, null);
const logs = readText(logPath)
  .split(/\r?\n/)
  .filter(Boolean)
  .map(parseViennaLine)
  .filter(Boolean);

if (!missed || !hourly) {
  process.stderr.write('Missing catch-up inputs. Run with --refresh or generate missed-slot-board and hourly-update-draft artifacts first.\n');
  process.exit(1);
}

const slots = Array.isArray(missed.missing_hourly_slots) ? [...missed.missing_hourly_slots].reverse().slice(0, limit) : [];
const topOpen = hourly.open_pressure?.[0] || missed.top_open_pressure || 'none';
const topNext = hourly.next_moves?.[0] || missed.top_next_move || 'none';
const streamStatus = hourly.stream?.status || missed.headline_status || 'unknown';
const bridgeAnchor = bridge?.narration_anchors?.[0] || missed.freshest_anchor || hourly.this_hour_done?.[0] || 'No current anchor visible.';

const runs = slots.map((slot, index) => {
  const slotEvidence = logs.filter(entry => entry.slot === slot && !String(entry.message).startsWith('hourly update due/recorded'));
  const evidenceLines = slotEvidence.slice(-3).map(entry => oneLine(entry.message, 160));
  const freshest = evidenceLines[0] || (index === 0 ? bridgeAnchor : null) || 'No slot-specific evidence line found in the operations log.';
  const mode = evidenceLines.length ? 'EVIDENCE_READY' : 'ACK_ONLY';
  const risk = evidenceLines.length ? 'LOW' : 'HIGH';
  const catchupText = evidenceLines.length
    ? `[${slot} CEST] QA catch-up update\n\nStream:\n- Status: ${streamStatus}\n- Backfill mode: evidence-based catch-up\n\nThis hour done:\n- ${evidenceLines[0] || 'none'}\n- ${evidenceLines[1] || 'none'}\n- ${evidenceLines[2] || 'none'}\n\nOpen pressure now:\n- ${topOpen}\n\nNext after catch-up send:\n1. ${topNext}\n2. Refresh missed-slot board and verify whether ${slot} is still missing\n3. If still missing, keep slot open and note the backlog explicitly` 
    : `[${slot} CEST] QA catch-up update\n\nStream:\n- Status: ${streamStatus}\n- Backfill mode: acknowledgement-only (no slot-specific evidence visible yet)\n\nThis hour done:\n- Missed full-hour slot acknowledged; no reliable slot-specific completion line is visible in the operations log yet\n- Freshest visible anchor right now: ${oneLine(bridgeAnchor, 150)}\n- Do not overclaim this slot until a real evidence line exists\n\nOpen pressure now:\n- ${topOpen}\n\nNext after catch-up send:\n1. ${topNext}\n2. Add/locate real slot evidence if this hour should contain a concrete completion\n3. Refresh missed-slot board and keep this slot open until the audit chain clears`;

  return {
    priority: index + 1,
    slot,
    mode,
    evidence_count: evidenceLines.length,
    evidence_lines: evidenceLines,
    freshest_line: freshest,
    operator_risk: risk,
    clear_after_send_check: [
      `1. Send/use the catch-up text for ${slot}.`,
      `2. Re-run: node bertlclaw-tools/qa-missed-slot-board.js --refresh --hours=${hours}`,
      `3. If ${slot} still appears in qa-artifacts/missed-slot-board/latest.json, keep it OPEN and do not mark cleared.`,
    ],
    catchup_text: catchupText,
  };
});

const report = {
  generated_at: viennaStamp(),
  status: slots.length ? (runs.some(item => item.mode === 'ACK_ONLY') ? 'ACTION_REQUIRED' : 'READY_TO_BACKFILL') : 'CLEAR',
  audit_window_hours: missed.audit_window_hours || hours,
  missing_slots_seen: missed.missing_hourly_slots || [],
  handled_slots: runs.map(item => item.slot),
  handled_limit: limit,
  stream_status: streamStatus,
  top_open_pressure: topOpen,
  top_next_move: topNext,
  freshest_anchor: bridgeAnchor,
  runner_rule: slots.length
    ? 'Work newest missing slot first. Use evidence-based text when a slot has real log lines; otherwise send acknowledgement-only text and keep the slot explicitly open until the audit chain clears.'
    : 'No catch-up run needed; backlog is clear.',
  runs,
  clearance_workflow: [
    'Generate/refresh the runner.',
    'Send the newest catch-up text first.',
    'Refresh the missed-slot board.',
    'Only treat a slot as cleared when it disappears from the missed-slot board after refresh.',
  ],
};

const md = `# BertlClaw QA Catch-up Runner\n\nGenerated: ${report.generated_at}\nStatus: **${report.status}**\nAudit window: last ${report.audit_window_hours} hour(s)\n\n## Summary\n- Missing slots seen: ${report.missing_slots_seen.length ? report.missing_slots_seen.join(', ') : 'none'}\n- Slots prepared in this run: ${report.handled_slots.length ? report.handled_slots.join(', ') : 'none'}\n- Stream status: **${report.stream_status}**\n- Top open pressure: ${report.top_open_pressure}\n- Top next move: ${report.top_next_move}\n- Freshest anchor: ${report.freshest_anchor}\n\n## Runner rule\n- ${report.runner_rule}\n\n## Clearance workflow\n${report.clearance_workflow.map(item => `- ${item}`).join('\n')}\n\n## Prepared catch-up queue\n${report.runs.length ? report.runs.map(item => `### ${item.priority}. ${item.slot} — ${item.mode}\n- Operator risk: **${item.operator_risk}**\n- Evidence lines: **${item.evidence_count}**\n- Freshest line: ${item.freshest_line}\n- Clear-after-send check:\n${item.clear_after_send_check.map(step => `  - ${step}`).join('\n')}\n\n\`\`\`text\n${item.catchup_text}\n\`\`\``).join('\n\n') : '- No catch-up queue right now.'}\n`;

const txt = report.runs.length
  ? report.runs.map(item => `${item.priority}. ${item.slot} [${item.mode}] -> ${item.freshest_line}`).join('\n')
  : 'No catch-up queue right now.';

ensureDir(outJson);
fs.writeFileSync(outJson, JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(outMd, md + '\n');
fs.writeFileSync(outTxt, txt + '\n');
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
