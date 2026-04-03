#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const heartbeatTool = path.join(root, 'bertlclaw-tools', 'reminder-heartbeat.js');
const auditTool = path.join(root, 'bertlclaw-tools', 'reminder-audit.js');
const proofTool = path.join(root, 'bertlclaw-tools', 'qa-proof-of-run.js');
const streamTool = path.join(root, 'bertlclaw-tools', 'qa-stream-status.js');
const opsTool = path.join(root, 'bertlclaw-tools', 'qa-ops-control.js');

const auditPath = path.join(root, 'qa-artifacts', 'reminder-audit', 'latest.json');
const proofPath = path.join(root, 'qa-artifacts', 'proof-of-run', 'latest.json');
const streamPath = path.join(root, 'qa-artifacts', 'stream-status', 'latest.json');
const opsPath = path.join(root, 'qa-artifacts', 'ops-control', 'latest.json');
const outDir = path.join(root, 'qa-artifacts', 'control-tower');
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
    formatter.formatToParts(date).filter(part => part.type !== 'literal').map(part => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CEST`;
}

function runStep(name, file, extraArgs = []) {
  const startedAt = Date.now();
  try {
    const stdout = execFileSync(process.execPath, [file, ...extraArgs], {
      cwd: root,
      stdio: 'pipe',
      encoding: 'utf8',
    });
    return {
      name,
      ok: true,
      seconds: Number(((Date.now() - startedAt) / 1000).toFixed(2)),
      output_preview: stdout.trim().split('\n').slice(0, 12).join('\n'),
    };
  } catch (error) {
    const stderr = error.stderr ? String(error.stderr) : '';
    const stdout = error.stdout ? String(error.stdout) : '';
    return {
      name,
      ok: false,
      seconds: Number(((Date.now() - startedAt) / 1000).toFixed(2)),
      output_preview: [stdout.trim(), stderr.trim()].filter(Boolean).join('\n').split('\n').slice(0, 16).join('\n'),
      exit_code: typeof error.status === 'number' ? error.status : 1,
    };
  }
}

const args = process.argv.slice(2);
const hoursArg = args.find(arg => arg.startsWith('--hours='));
const hours = Math.max(1, Number(hoursArg ? hoursArg.split('=')[1] : 6) || 6);
const skipHeartbeat = args.includes('--skip-heartbeat');

const steps = [];
if (!skipHeartbeat) steps.push(runStep('reminder-heartbeat', heartbeatTool));
steps.push(runStep('reminder-audit', auditTool, [`--hours=${hours}`]));
steps.push(runStep('qa-proof-of-run', proofTool));
steps.push(runStep('qa-stream-status', streamTool));
steps.push(runStep('qa-ops-control', opsTool));

const audit = readJson(auditPath, null);
const proof = readJson(proofPath, null);
const stream = readJson(streamPath, null);
const ops = readJson(opsPath, null);

const failedStep = steps.find(step => !step.ok);
const stale = Boolean(stream?.stream_health?.stale_stream_detected || ops?.stale_stream_detected);
const missingSlots = audit?.missing_hourly_slots || ops?.missing_hourly_slots || [];
const ready = proof?.action_queues?.ready_for_retest || [];
const blocked = proof?.action_queues?.blocked_manual_access || [];
const p0Blocked = blocked.filter(item => item.severity === 'P0');

const nextMoves = [];
if (failedStep) nextMoves.push(`Fix failed step first: ${failedStep.name}.`);
if (stale) nextMoves.push('Treat stream freshness as broken until the next full-hour update is visible in both state and log artifacts.');
if (missingSlots.length) nextMoves.push(`Recover missed slots or annotate why they were missed: ${missingSlots.join(', ')}.`);
if (p0Blocked.length) nextMoves.push(`Escalate human blocker: ${p0Blocked.map(item => item.bug_id).join(', ')}.`);
if (ready.length) nextMoves.push(`Burn down retest queue before new exploratory work: ${ready.map(item => item.bug_id).join(', ')}.`);
if (!nextMoves.length) nextMoves.push('No urgent recovery move detected; keep the next full-hour run on time.');

const overall = (() => {
  if (failedStep) return 'FAIL';
  if (stale || missingSlots.length || p0Blocked.length) return 'ATTENTION';
  if (ready.length) return 'QUEUE';
  return 'PASS';
})();

const report = {
  generated_at: viennaNow(),
  hours_window: hours,
  run_mode: skipHeartbeat ? 'audit-only' : 'full-sequence',
  overall_status: overall,
  failed_step: failedStep ? failedStep.name : null,
  steps,
  signals: {
    stale_stream_detected: stale,
    missing_hourly_slots: missingSlots,
    next_expected_hourly_slot: audit?.next_expected_hourly_slot || ops?.next_expected_hourly_slot || null,
    ready_for_retest_count: ready.length,
    blocked_manual_access_count: blocked.length,
    p0_blocked_count: p0Blocked.length,
    headline_status: stream?.headline_status || null,
    ops_control_status: ops?.overall_status || null,
  },
  next_moves: nextMoves,
  artifact_paths: {
    auditPath,
    proofPath,
    streamPath,
    opsPath,
    outJson,
    outMd,
  },
};

const md = `# BertlClaw QA Control Tower\n\nGenerated: ${report.generated_at}\nRun mode: ${report.run_mode}\nAudit window: ${report.hours_window} hour(s)\n\n## Overall\n- Status: **${report.overall_status}**\n- Failed step: **${report.failed_step || 'none'}**\n- Stream headline: **${report.signals.headline_status || 'n/a'}**\n- Ops control status: **${report.signals.ops_control_status || 'n/a'}**\n- Stale stream detected: **${report.signals.stale_stream_detected ? 'YES' : 'NO'}**\n- Missing hourly slots: **${report.signals.missing_hourly_slots.length}**\n- Next expected hourly slot: **${report.signals.next_expected_hourly_slot || 'n/a'}**\n- Ready for retest: **${report.signals.ready_for_retest_count}**\n- P0 blocked manual access: **${report.signals.p0_blocked_count}**\n\n## Sequence check\n${report.steps.map(step => `- [${step.ok ? 'x' : ' '}] ${step.name} (${step.seconds}s)${step.ok ? '' : ` — exit ${step.exit_code}`}`).join('\n')}\n\n## Operator next moves\n${report.next_moves.map(item => `- ${item}`).join('\n')}\n\n## Artifact handoff\n- Reminder audit: ${report.artifact_paths.auditPath}\n- Proof of run: ${report.artifact_paths.proofPath}\n- Stream status: ${report.artifact_paths.streamPath}\n- Ops control: ${report.artifact_paths.opsPath}\n- Control tower JSON: ${report.artifact_paths.outJson}\n- Control tower markdown: ${report.artifact_paths.outMd}\n`;

ensureDir(outJson);
fs.writeFileSync(outJson, JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(outMd, md + '\n');
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
