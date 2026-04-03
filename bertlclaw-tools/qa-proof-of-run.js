#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const statePath = path.join(root, 'state', 'bertlclaw-reminders.json');
const auditPath = path.join(root, 'qa-artifacts', 'reminder-audit', 'latest.json');
const bugsPath = path.join(root, 'bertlclaw-qa-active-bugs.csv');
const outDir = path.join(root, 'qa-artifacts', 'proof-of-run');
const latestPath = path.join(outDir, 'latest.json');
const historyPath = path.join(outDir, 'history.json');

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

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
}

function nowVienna(date = new Date()) {
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
  const parts = Object.fromEntries(formatter.formatToParts(date).filter(p => p.type !== 'literal').map(p => [p.type, p.value]));
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}:${parts.second}`,
    stamp: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CEST`,
  };
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

const bugs = parseCsv(readText(bugsPath));
const state = readJson(statePath, null);
const audit = readJson(auditPath, null);
const timestamp = nowVienna().stamp;

const byStatus = bugs.reduce((acc, bug) => {
  acc[bug.status] = (acc[bug.status] || 0) + 1;
  return acc;
}, {});
const readyForRetest = bugs.filter(b => b.status === 'ready_for_retest').map(b => ({
  bug_id: b.bug_id,
  severity: b.severity,
  title: b.title,
  next_action: b.next_action,
  retest_after: b.retest_after,
}));
const blockedManual = bugs.filter(b => b.needs_manual_access === 'yes').map(b => ({
  bug_id: b.bug_id,
  severity: b.severity,
  title: b.title,
  next_action: b.next_action,
}));

const report = {
  generated_at: timestamp,
  source_artifacts: {
    statePath,
    auditPath,
    bugsPath,
  },
  totals: {
    bug_count: bugs.length,
    by_status: byStatus,
    ready_for_retest_count: readyForRetest.length,
    blocked_manual_access_count: blockedManual.length,
  },
  proof_of_run: {
    reminder_state_last_run_at: state?.last_run_at || null,
    reminder_last_hourly_update_at: state?.last_hourly_update_at || null,
    reminder_last_daily_github_ticket_reminder_at: state?.last_daily_github_ticket_reminder_at || null,
    reminder_recent_runs: Array.isArray(state?.runs) ? state.runs.slice(0, 5) : [],
    reminder_audit_status: audit?.status || 'unknown',
    reminder_audit_generated_at: audit?.generated_at || null,
    missing_hourly_slots: audit?.missing_hourly_slots || [],
    next_expected_hourly_slot: audit?.next_expected_hourly_slot || null,
  },
  action_queues: {
    ready_for_retest: readyForRetest,
    blocked_manual_access: blockedManual,
    p0_p1_open: bugs.filter(b => ['P0', 'P1'].includes(b.severity) && !['closed', 'retested_pass'].includes(b.status)).map(b => ({
      bug_id: b.bug_id,
      severity: b.severity,
      status: b.status,
      title: b.title,
      next_action: b.next_action,
    })),
  },
};

const history = readJson(historyPath, []);
const nextHistory = [report, ...history].slice(0, 50);
ensureDir(latestPath);
fs.writeFileSync(latestPath, JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(historyPath, JSON.stringify(nextHistory, null, 2) + '\n');
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
