#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const auditTool = path.join(root, 'bertlclaw-tools', 'reminder-audit.js');
const statusTool = path.join(root, 'bertlclaw-tools', 'qa-hourly-status.js');
const auditPath = path.join(root, 'qa-artifacts', 'reminder-audit', 'latest.json');
const hourlyStatusPath = path.join(root, 'qa-artifacts', 'hourly-status', 'latest.json');
const bridgePath = path.join(root, 'qa-artifacts', 'hour-slot-bridge', 'latest.json');
const streamPath = path.join(root, 'qa-artifacts', 'stream-status', 'latest.json');
const outDir = path.join(root, 'qa-artifacts', 'missed-slot-board');
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

function run(file, args = []) {
  execFileSync(process.execPath, [file, ...args], { cwd: root, stdio: 'pipe' });
}

function oneLine(value, max = 160) {
  if (!value) return 'none';
  const clean = String(value).replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

const args = process.argv.slice(2);
const refresh = args.includes('--refresh');
const hoursArg = args.find(arg => arg.startsWith('--hours='));
const hours = Math.max(1, Number(hoursArg ? hoursArg.split('=')[1] : 8) || 8);

if (refresh) {
  run(auditTool, [`--hours=${hours}`]);
  run(statusTool, [`--hours=${hours}`]);
}

const audit = readJson(auditPath, null);
const hourlyStatus = readJson(hourlyStatusPath, null);
const bridge = readJson(bridgePath, null);
const stream = readJson(streamPath, null);

if (!audit) {
  process.stderr.write('Missing reminder audit artifact. Run with --refresh or generate qa-artifacts/reminder-audit/latest.json first.\n');
  process.exit(1);
}

const missing = Array.isArray(audit.missing_hourly_slots) ? [...audit.missing_hourly_slots] : [];
const missingNewestFirst = [...missing].reverse();
const backlogSeverity = missing.length === 0 ? 'CLEAR' : missing.length === 1 ? 'WATCH' : missing.length <= 3 ? 'PRESSURE' : 'FAIL';
const backlogMinutes = (stream?.stream_health?.minutes_since_last_hourly_update ?? null);
const narrationAnchor = bridge?.narration_anchors?.[0] || hourlyStatus?.draft?.this_hour_done?.[0] || 'No fresh slot anchor available yet.';
const topOpen = hourlyStatus?.draft?.open_pressure?.[0] || 'none';
const topNext = hourlyStatus?.draft?.next_moves?.[0] || 'none';

const recoveryQueue = missingNewestFirst.map((slot, index) => ({
  priority: index + 1,
  slot,
  action: index === 0
    ? `Publish a catch-up note for ${slot} using the freshest visible anchor: ${oneLine(narrationAnchor, 120)}`
    : `Backfill ${slot} with a brief evidence-based line, then continue to the next older missed slot`,
  copy_ready: `[${slot}] Catch-up QA status: missed full-hour slot acknowledged. Best visible anchor now: ${oneLine(narrationAnchor, 110)} Open pressure: ${oneLine(topOpen, 110)} Next: ${oneLine(topNext, 110)}`,
}));

const summaryLine = missing.length === 0
  ? `[${audit.generated_at || viennaStamp()}] Missed-slot board CLEAR — no missing hourly slots in last ${audit.audit_window_hours || hours}h.`
  : `[${audit.generated_at || viennaStamp()}] Missed-slot board ${backlogSeverity} — ${missing.length} missing hourly slot(s) in last ${audit.audit_window_hours || hours}h; oldest=${missing[0]}, newest=${missing[missing.length - 1]}.`;

const report = {
  generated_at: viennaStamp(),
  status: backlogSeverity,
  audit_window_hours: audit.audit_window_hours || hours,
  missing_hourly_slots_count: missing.length,
  missing_hourly_slots: missing,
  minutes_since_last_hourly_update: backlogMinutes,
  headline_status: stream?.headline_status || hourlyStatus?.draft?.stream?.status || 'unknown',
  top_open_pressure: topOpen,
  top_next_move: topNext,
  freshest_anchor: narrationAnchor,
  recovery_queue: recoveryQueue,
  recovery_rule: missing.length
    ? 'Clear newest missed slot first so the reporting chain regains a current anchor, then backfill older slots if still needed.'
    : 'No backlog to clear; keep the next full-hour slot on time.',
  summary_line: summaryLine,
};

const md = `# BertlClaw QA Missed-Slot Board\n\nGenerated: ${report.generated_at}\nAudit window: last ${report.audit_window_hours} hour(s)\nStatus: **${report.status}**\n\n## Summary\n- ${report.summary_line}\n- Headline status: **${report.headline_status}**\n- Minutes since last hourly update: **${report.minutes_since_last_hourly_update ?? 'n/a'}**\n- Freshest anchor: ${report.freshest_anchor}\n- Top open pressure: ${report.top_open_pressure}\n- Top next move: ${report.top_next_move}\n\n## Recovery rule\n- ${report.recovery_rule}\n\n## Missed slot backlog\n${report.missing_hourly_slots_count ? report.missing_hourly_slots.map(slot => `- ${slot}`).join('\n') : '- none'}\n\n## Recovery queue\n${report.recovery_queue.length ? report.recovery_queue.map(item => `### ${item.priority}. ${item.slot}\n- Action: ${item.action}\n- Copy-ready catch-up:\n\n\`\`\`text\n${item.copy_ready}\n\`\`\``).join('\n\n') : '- No recovery queue right now.'}\n`;

const txt = `${summaryLine}\nFreshest anchor: ${report.freshest_anchor}\nTop open: ${report.top_open_pressure}\nTop next: ${report.top_next_move}\n${report.recovery_queue.length ? `\nRecovery queue:\n${report.recovery_queue.map(item => `${item.priority}. ${item.slot} -> ${item.action}`).join('\n')}` : '\nRecovery queue: none'}`;

ensureDir(outJson);
fs.writeFileSync(outJson, JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(outMd, md + '\n');
fs.writeFileSync(outTxt, txt + '\n');
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
