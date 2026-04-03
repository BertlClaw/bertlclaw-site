#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const proofTool = path.join(root, 'bertlclaw-tools', 'qa-proof-of-run.js');
const streamTool = path.join(root, 'bertlclaw-tools', 'qa-stream-status.js');
const auditTool = path.join(root, 'bertlclaw-tools', 'reminder-audit.js');

const proofPath = path.join(root, 'qa-artifacts', 'proof-of-run', 'latest.json');
const streamPath = path.join(root, 'qa-artifacts', 'stream-status', 'latest.json');
const outDir = path.join(root, 'qa-artifacts', 'ops-control');
const outJson = path.join(outDir, 'latest.json');
const outMd = path.join(outDir, 'latest.md');

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

function viennaNow(date = new Date()) {
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
    formatter.formatToParts(date).filter(p => p.type !== 'literal').map(p => [p.type, p.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CEST`;
}

function refresh(hours) {
  execFileSync(process.execPath, [auditTool, `--hours=${hours}`], { cwd: root, stdio: 'pipe' });
  execFileSync(process.execPath, [proofTool], { cwd: root, stdio: 'pipe' });
  execFileSync(process.execPath, [streamTool], { cwd: root, stdio: 'pipe' });
}

function statusFrom(cond, passText, failText, severity = 'warn') {
  return {
    ok: Boolean(cond),
    severity,
    label: cond ? 'PASS' : severity === 'critical' ? 'FAIL' : 'WATCH',
    text: cond ? passText : failText,
  };
}

const args = process.argv.slice(2);
const refreshRequested = args.includes('--refresh');
const hoursArg = args.find(arg => arg.startsWith('--hours='));
const hours = Math.max(1, Number(hoursArg ? hoursArg.split('=')[1] : 6) || 6);

if (refreshRequested) refresh(hours);

const proof = readJson(proofPath, null);
const stream = readJson(streamPath, null);
if (!proof || !stream) {
  process.stderr.write('Missing proof/stream artifacts. Run with --refresh or generate qa-proof-of-run + qa-stream-status first.\n');
  process.exit(1);
}

const missing = proof.proof_of_run?.missing_hourly_slots || [];
const ready = proof.action_queues?.ready_for_retest || [];
const blocked = proof.action_queues?.blocked_manual_access || [];
const p0Blocked = blocked.filter(item => item.severity === 'P0');
const minutesRun = stream.stream_health?.minutes_since_last_run;
const minutesHourly = stream.stream_health?.minutes_since_last_hourly_update;
const stale = Boolean(stream.stream_health?.stale_stream_detected);
const nextExpected = proof.proof_of_run?.next_expected_hourly_slot || null;

const checks = [
  {
    key: 'run_freshness',
    ...statusFrom((minutesRun ?? 9999) <= 65, `QA control artifacts refreshed recently (${minutesRun} min ago).`, `Last control refresh is too old (${minutesRun ?? 'n/a'} min ago).`, 'critical'),
  },
  {
    key: 'hourly_update_freshness',
    ...statusFrom((minutesHourly ?? 9999) <= 65, `Last hourly update is within guardrail (${minutesHourly} min ago).`, `Hourly update is outside guardrail (${minutesHourly ?? 'n/a'} min ago).`, 'critical'),
  },
  {
    key: 'missing_hour_slots',
    ...statusFrom(missing.length === 0, 'No missing full-hour slots in the current audit window.', `Missing full-hour slots detected: ${missing.join(', ') || 'unknown'}.`, 'critical'),
  },
  {
    key: 'stale_stream',
    ...statusFrom(!stale, 'Stream is not flagged stale.', 'Stream is flagged stale and needs immediate recovery.', 'critical'),
  },
  {
    key: 'p0_human_blocker',
    ...statusFrom(p0Blocked.length === 0, 'No P0 human blocker is currently parked in the queue.', `P0 human blocker active: ${p0Blocked.map(item => item.bug_id).join(', ')}.`, 'critical'),
  },
  {
    key: 'retest_queue_visibility',
    ...statusFrom(true, `Retest queue visible: ${ready.length} item(s) ready for retest.`, `Retest queue visibility unavailable.`, 'warn'),
  },
];

const failedCritical = checks.filter(item => !item.ok && item.severity === 'critical');
const watchItems = checks.filter(item => !item.ok && item.severity !== 'critical');
const overall = failedCritical.length ? 'FAIL' : watchItems.length ? 'WATCH' : 'PASS';

const recoveryMoves = [];
if (stale || missing.length || (minutesHourly ?? 9999) > 65 || (minutesRun ?? 9999) > 65) {
  recoveryMoves.push('Run `node bertlclaw-tools/reminder-audit.js --hours=6 && node bertlclaw-tools/qa-proof-of-run.js && node bertlclaw-tools/qa-stream-status.js && node bertlclaw-tools/qa-ops-control.js` to refresh the control view.');
}
if (missing.length) {
  recoveryMoves.push(`Investigate why these full-hour slots were missed: ${missing.join(', ')}.`);
}
if (p0Blocked.length) {
  recoveryMoves.push(`${p0Blocked.map(item => `${item.bug_id}: ${item.next_action}`).join(' | ')}`);
}
if (ready.length) {
  recoveryMoves.push(`Before new exploratory QA, clear ready-for-retest items: ${ready.map(item => item.bug_id).join(', ')}.`);
}
if (!recoveryMoves.length) {
  recoveryMoves.push('No immediate recovery action required. Keep the next full-hour slot covered.');
}

const report = {
  generated_at: viennaNow(),
  source_stream_generated_at: stream.stream_generated_at,
  source_proof_generated_at: stream.generated_at,
  overall_status: overall,
  stale_stream_detected: stale,
  missing_hourly_slots: missing,
  next_expected_hourly_slot: nextExpected,
  checks,
  top_recovery_moves: recoveryMoves,
};

const md = `# BertlClaw QA Ops Control Checklist\n\nGenerated: ${report.generated_at}\nSource stream status: ${report.source_stream_generated_at}\nSource proof-of-run: ${report.source_proof_generated_at}\n\n## Overall\n- Control status: **${report.overall_status}**\n- Stale stream detected: **${report.stale_stream_detected ? 'YES' : 'NO'}**\n- Next expected hourly slot: **${report.next_expected_hourly_slot || 'n/a'}**\n\n## Compact control checklist\n${checks.map(item => `- [${item.ok ? 'x' : ' '}] ${item.key} — ${item.label} — ${item.text}`).join('\n')}\n\n## Immediate recovery moves\n${report.top_recovery_moves.map(item => `- ${item}`).join('\n')}\n`;

ensureDir(outJson);
fs.writeFileSync(outJson, JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(outMd, md + '\n');
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
