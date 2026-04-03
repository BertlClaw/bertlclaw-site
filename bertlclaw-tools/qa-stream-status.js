#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const proofPath = path.join(root, 'qa-artifacts', 'proof-of-run', 'latest.json');
const outDir = path.join(root, 'qa-artifacts', 'stream-status');
const latestJsonPath = path.join(outDir, 'latest.json');
const latestMdPath = path.join(outDir, 'latest.md');
const operatorMdPath = path.join(outDir, 'operator-summary.md');

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function viennaNowParts(date = new Date()) {
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
    formatter.formatToParts(date)
      .filter(part => part.type !== 'literal')
      .map(part => [part.type, part.value]),
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
    stamp: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CEST`,
  };
}

function parseViennaTimestamp(input) {
  if (!input || typeof input !== 'string') return null;
  const match = input.trim().match(/^(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?/);
  if (!match) return null;
  const [, year, month, day, hour = '00', minute = '00', second = '00'] = match;
  return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
}

function minutesDiff(later, earlier) {
  if (!(later instanceof Date) || Number.isNaN(later) || !(earlier instanceof Date) || Number.isNaN(earlier)) return null;
  return Math.max(0, Math.round((later.getTime() - earlier.getTime()) / 60000));
}

function classifyFreshness(minutes) {
  if (minutes == null) return { level: 'unknown', label: 'unknown', isStale: true };
  if (minutes <= 20) return { level: 'fresh', label: 'fresh', isStale: false };
  if (minutes <= 65) return { level: 'watch', label: 'watch', isStale: false };
  if (minutes <= 125) return { level: 'stale', label: 'stale', isStale: true };
  return { level: 'critical', label: 'critical', isStale: true };
}

function countConsecutiveHourlyMisses(missingSlots) {
  if (!Array.isArray(missingSlots) || !missingSlots.length) return 0;
  const sorted = [...missingSlots].sort();
  let consecutive = 1;
  let best = 1;
  for (let i = 1; i < sorted.length; i += 1) {
    const prev = parseViennaTimestamp(sorted[i - 1]);
    const current = parseViennaTimestamp(sorted[i]);
    if (!prev || !current) {
      consecutive = 1;
      continue;
    }
    const deltaMinutes = minutesDiff(current, prev);
    if (deltaMinutes === 60) {
      consecutive += 1;
      best = Math.max(best, consecutive);
    } else {
      consecutive = 1;
    }
  }
  return best;
}

const proof = readJson(proofPath, null);
if (!proof) {
  process.stderr.write('Missing proof-of-run artifact. Run qa-proof-of-run.js first.\n');
  process.exit(1);
}

const ready = proof.action_queues?.ready_for_retest || [];
const blocked = proof.action_queues?.blocked_manual_access || [];
const p0p1 = proof.action_queues?.p0_p1_open || [];
const missingSlots = proof.proof_of_run?.missing_hourly_slots || [];
const now = new Date();
const nowVienna = viennaNowParts(now);
const lastRunAt = parseViennaTimestamp(proof.proof_of_run?.reminder_state_last_run_at || null);
const lastHourlyAt = parseViennaTimestamp(proof.proof_of_run?.reminder_last_hourly_update_at || null);
const minutesSinceLastRun = minutesDiff(now, lastRunAt);
const minutesSinceLastHourly = minutesDiff(now, lastHourlyAt);
const runFreshness = classifyFreshness(minutesSinceLastRun);
const hourlyFreshness = classifyFreshness(minutesSinceLastHourly);
const consecutiveMisses = countConsecutiveHourlyMisses(missingSlots);

const attention = [];
if (blocked.some(b => b.severity === 'P0')) {
  attention.push('P0 human blocker present: manual access still required to close the top issue.');
}
if (hourlyFreshness.level === 'critical' || runFreshness.level === 'critical') {
  attention.push(`Stream appears CRITICAL/stale: last hourly update ${minutesSinceLastHourly ?? 'unknown'} min ago, last run ${minutesSinceLastRun ?? 'unknown'} min ago.`);
} else if (hourlyFreshness.isStale || runFreshness.isStale) {
  attention.push(`Stream appears stale: last hourly update ${minutesSinceLastHourly ?? 'unknown'} min ago, last run ${minutesSinceLastRun ?? 'unknown'} min ago.`);
}
if (missingSlots.length) {
  attention.push(`Hourly reporting gaps detected: ${missingSlots.length} missing slot(s), longest visible gap ${consecutiveMisses} hour(s).`);
}
if (ready.length) {
  attention.push(`Retest queue active: ${ready.length} item(s) ready for retest before new exploratory work.`);
}
if (!attention.length) {
  attention.push('No urgent operator action signals detected.');
}

const topActions = [];
for (const item of [...p0p1, ...ready]) {
  const line = `${item.bug_id}: ${item.next_action}`;
  if (!topActions.includes(line)) topActions.push(line);
  if (topActions.length >= 5) break;
}

const headlineStatus = (() => {
  if (blocked.some(b => b.severity === 'P0')) return 'needs-human-on-p0';
  if (hourlyFreshness.level === 'critical' || runFreshness.level === 'critical') return 'stream-stale-critical';
  if (missingSlots.length > 0 || hourlyFreshness.isStale || runFreshness.isStale) return 'stream-needs-attention';
  if (ready.length > 0) return 'retest-queue-active';
  return 'stable-no-urgent-retest-queue';
})();

const summary = {
  generated_at: proof.generated_at,
  stream_generated_at: nowVienna.stamp,
  headline_status: headlineStatus,
  counters: proof.totals,
  proof_of_run: proof.proof_of_run,
  stream_health: {
    now: nowVienna.stamp,
    minutes_since_last_run: minutesSinceLastRun,
    minutes_since_last_hourly_update: minutesSinceLastHourly,
    last_run_freshness: runFreshness.level,
    last_hourly_update_freshness: hourlyFreshness.level,
    missing_hourly_slots_count: missingSlots.length,
    longest_consecutive_missing_hourly_gap: consecutiveMisses,
    stale_stream_detected: Boolean(hourlyFreshness.isStale || runFreshness.isStale || missingSlots.length > 0),
  },
  operator_summary: {
    immediate_attention: attention,
    next_best_moves: topActions,
  },
  top_actions: topActions,
};

const md = `# BertlClaw QA Stream Status\n\nGenerated from proof-of-run: ${summary.generated_at}\nRendered operator view: ${summary.stream_generated_at}\n\n## Operator Summary\n- Status: **${summary.headline_status}**\n- Last run freshness: **${summary.stream_health.last_run_freshness}** (${summary.stream_health.minutes_since_last_run ?? 'n/a'} min ago)\n- Last hourly freshness: **${summary.stream_health.last_hourly_update_freshness}** (${summary.stream_health.minutes_since_last_hourly_update ?? 'n/a'} min ago)\n- Missing hourly slots: **${summary.stream_health.missing_hourly_slots_count}**\n- Longest visible hourly gap: **${summary.stream_health.longest_consecutive_missing_hourly_gap} hour(s)**\n- Stale stream detected: **${summary.stream_health.stale_stream_detected ? 'yes' : 'no'}**\n\n### Immediate attention\n${summary.operator_summary.immediate_attention.map(item => `- ${item}`).join('\n')}\n\n### Next best moves\n${summary.operator_summary.next_best_moves.length ? summary.operator_summary.next_best_moves.map(item => `- ${item}`).join('\n') : '- none'}\n\n## Counters\n- Total bugs: ${summary.counters.bug_count}\n- Ready for retest: ${summary.counters.ready_for_retest_count}\n- Blocked manual access: ${summary.counters.blocked_manual_access_count}\n- By status: ${Object.entries(summary.counters.by_status || {}).map(([k, v]) => `${k}=${v}`).join(', ')}\n\n## Proof-of-run visibility\n- Reminder last run: ${summary.proof_of_run.reminder_state_last_run_at || 'n/a'}\n- Last hourly slot recorded: ${summary.proof_of_run.reminder_last_hourly_update_at || 'n/a'}\n- Last daily ticket reminder: ${summary.proof_of_run.reminder_last_daily_github_ticket_reminder_at || 'n/a'}\n- Reminder audit status: ${summary.proof_of_run.reminder_audit_status || 'unknown'}\n- Audit generated: ${summary.proof_of_run.reminder_audit_generated_at || 'n/a'}\n- Missing hourly slots: ${missingSlots.length ? missingSlots.join(', ') : 'none'}\n- Next expected hourly slot: ${summary.proof_of_run.next_expected_hourly_slot || 'n/a'}\n\n## Highest-signal queues\n\n### P0/P1 open\n${p0p1.length ? p0p1.map(item => `- ${item.bug_id} [${item.severity}/${item.status}] — ${item.title} -> ${item.next_action}`).join('\n') : '- none'}\n\n### Ready for retest\n${ready.length ? ready.map(item => `- ${item.bug_id} [${item.severity}] — ${item.title} -> ${item.next_action}`).join('\n') : '- none'}\n\n### Blocked by manual access\n${blocked.length ? blocked.map(item => `- ${item.bug_id} [${item.severity}] — ${item.title} -> ${item.next_action}`).join('\n') : '- none'}\n`;

const operatorMd = `# BertlClaw QA Operator Summary\n\nRendered: ${summary.stream_generated_at}\nSource proof-of-run: ${summary.generated_at}\n\n## At a glance\n- Overall status: **${summary.headline_status}**\n- Stream stale: **${summary.stream_health.stale_stream_detected ? 'YES' : 'NO'}**\n- Last run: **${summary.stream_health.minutes_since_last_run ?? 'n/a'} min ago** (${summary.stream_health.last_run_freshness})\n- Last hourly update: **${summary.stream_health.minutes_since_last_hourly_update ?? 'n/a'} min ago** (${summary.stream_health.last_hourly_update_freshness})\n- Missing hourly slots: **${summary.stream_health.missing_hourly_slots_count}**\n- Longest consecutive missed run gap: **${summary.stream_health.longest_consecutive_missing_hourly_gap} hour(s)**\n\n## What needs attention now\n${summary.operator_summary.immediate_attention.map(item => `- ${item}`).join('\n')}\n\n## What to do next\n${summary.operator_summary.next_best_moves.length ? summary.operator_summary.next_best_moves.map(item => `- ${item}`).join('\n') : '- none'}\n`;

ensureDir(latestJsonPath);
fs.writeFileSync(latestJsonPath, JSON.stringify(summary, null, 2) + '\n');
fs.writeFileSync(latestMdPath, md + '\n');
fs.writeFileSync(operatorMdPath, operatorMd + '\n');
process.stdout.write(JSON.stringify(summary, null, 2) + '\n');
