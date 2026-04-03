#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const bugsPath = path.join(root, 'bertlclaw-qa-active-bugs.csv');
const hourlyTool = path.join(root, 'bertlclaw-tools', 'qa-hourly-status.js');
const hourlyPath = path.join(root, 'qa-artifacts', 'hourly-status', 'latest.json');
const outDir = path.join(root, 'qa-artifacts', 'ticket-close-helper');
const outJson = path.join(outDir, 'latest.json');
const outMd = path.join(outDir, 'latest.md');
const outTxt = path.join(outDir, 'latest.txt');

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
  const parts = Object.fromEntries(formatter.formatToParts(date).filter(p => p.type !== 'literal').map(p => [p.type, p.value]));
  return {
    stamp: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CEST`,
    slot: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:00 CEST`,
  };
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

function laneFor(bug) {
  if (bug.status === 'blocked_manual_access') return 'manual-blocker';
  if (bug.status === 'ready_for_retest') return 'retest-close';
  if (bug.status === 'retested_fail') return 'fix-return';
  if (bug.status === 'partial') return 'partial-follow-up';
  return 'monitor';
}

function statusProposal(bug) {
  if (bug.status === 'blocked_manual_access') return 'blocked_manual_access or retested_pass';
  if (bug.status === 'ready_for_retest') return 'retested_pass / partial / retested_fail';
  if (bug.status === 'retested_fail') return 'retested_fail';
  return 'update as needed';
}

function scorecardHint(bug) {
  if (bug.bug_id === 'BCQA-001' || bug.bug_id === 'BCQA-004' || bug.bug_id === 'BCQA-005') {
    return 'Use BERTLCLAW-QA-PROOF-MOBILE-FORM-SCORECARD-2026-04-02.md';
  }
  if (bug.bug_id === 'BCQA-002' || bug.bug_id === 'BCQA-003' || bug.bug_id === 'BCQA-006') {
    return 'Use BERTLCLAW-QA-TOP5-FIX-VERIFICATION-WORKSHEET-2026-04-02.md';
  }
  return 'Use the most relevant worksheet/pack for this bug.';
}

function firstLine(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function formatTicketSection(bug, index, hourly) {
  const resultCode = bug.status === 'blocked_manual_access' ? 'PASS / FAIL / BLOCKED' : 'PASS / PARTIAL / FAIL';
  return `## ${index + 1}. ${bug.bug_id} — ${bug.title}
- Severity / status now: ${bug.severity} / ${bug.status}
- Lane: ${laneFor(bug)}
- Flow: ${bug.page_or_flow}
- Environment: ${bug.environment}
- Manual access: ${bug.needs_manual_access === 'yes' ? 'yes' : 'no'}
- Worksheet / scorecard: ${scorecardHint(bug)}
- Current next action: ${bug.next_action}
- Current evidence from CSV: ${bug.evidence}

### Verification result
- Run timestamp:
- Operator:
- Result code: ${resultCode}
- Scorecard verdict summary:
- Key finding:
- Evidence refs (screenshots / mailbox / video / JSON / log):
- Adjacent-path check:

### CSV update helper
- Proposed status: ${statusProposal(bug)}
- actual rewrite:
- evidence rewrite:
- next_action rewrite:
- notes rewrite:

### Ticket-close / handoff note
\`\`${bug.bug_id}: [PASS/PARTIAL/FAIL/BLOCKED] — [what was verified]. Evidence: [refs]. CSV -> status=[new status]. Next: [next move].\`\`

### Hourly-status bridge
- Current hourly slot: ${hourly?.slot || 'n/a'}
- One-line hourly anchor: ${hourly?.summary_line || 'n/a'}
- Add this line into the next hourly update if relevant:
\`\`- ${bug.bug_id}: [closed/blocked/failed] — [short operator-readable outcome].\`\`
`;
}

const args = process.argv.slice(2);
const refresh = args.includes('--refresh');
const all = args.includes('--all');
const hoursArg = args.find(arg => arg.startsWith('--hours='));
const hours = Math.max(1, Number(hoursArg ? hoursArg.split('=')[1] : 6) || 6);
const idArg = args.find(arg => arg.startsWith('--ids='));
const requestedIds = idArg ? idArg.split('=')[1].split(',').map(item => item.trim()).filter(Boolean) : [];

if (refresh) {
  execFileSync(process.execPath, [hourlyTool, `--hours=${hours}`], { cwd: root, stdio: 'pipe' });
}

const bugs = sortBugs(parseCsv(readText(bugsPath)).filter(bug => !['closed', 'retested_pass'].includes(bug.status)));
const hourly = readJson(hourlyPath, null);
if (!bugs.length) {
  process.stderr.write('No active QA bugs found.\n');
  process.exit(1);
}
if (!hourly) {
  process.stderr.write('Missing hourly-status artifact. Run with --refresh or generate qa-hourly-status first.\n');
  process.exit(1);
}

let selected = bugs.slice(0, 3);
if (requestedIds.length) {
  selected = bugs.filter(bug => requestedIds.includes(bug.bug_id));
}
if (all) {
  selected = bugs;
}
if (!selected.length) {
  process.stderr.write('No matching bug IDs selected.\n');
  process.exit(1);
}

const now = viennaNow();
const report = {
  generated_at: now.stamp,
  slot: now.slot,
  selected_bug_ids: selected.map(bug => bug.bug_id),
  hourly_status: {
    slot: hourly.slot || null,
    summary_line: hourly.summary_line || null,
  },
  close_candidates: selected.map(bug => ({
    bug_id: bug.bug_id,
    title: bug.title,
    severity: bug.severity,
    status: bug.status,
    lane: laneFor(bug),
    page_or_flow: bug.page_or_flow,
    environment: bug.environment,
    needs_manual_access: bug.needs_manual_access,
    worksheet: scorecardHint(bug),
    current_actual: bug.actual,
    current_evidence: bug.evidence,
    current_next_action: bug.next_action,
    csv_status_options: statusProposal(bug),
    hourly_anchor: hourly.summary_line || null,
  })),
};

const md = `# BertlClaw QA Ticket-Close Helper

Generated: ${report.generated_at}
Current slot: ${report.slot}

Zweck: letzter kompakter Schritt zwischen **Scorecard / Worksheet -> Evidence refs -> CSV update -> hourly status**. Dieses Blatt ist absichtlich leichtgewichtig und für den direkten Abschluss eines manuellen QA-Runs gedacht.

## Operator flow
1. passenden Scorecard-/Worksheet-Run abschließen
2. unten pro Ticket nur Result + Evidence + CSV-Änderung eintragen
3. Ticket-close note kopieren
4. Hourly-status bridge Zeile in das nächste Stundenupdate übernehmen

## Current hourly anchor
- ${hourly.summary_line || 'n/a'}

## Selected closure candidates
${selected.map((bug, index) => formatTicketSection(bug, index, hourly)).join('\n')}

## End-of-run closure ledger
- Scorecard / worksheet completed: yes / no
- Evidence pack path or refs:
- CSV updated: yes / no
- Hourly status updated: yes / no
- Remaining blocker after this run:
- Next QA move:

## Copy-ready close-out summary
\`\`Manual QA close-out run on [date/time]. Tickets: ${selected.map(bug => `${bug.bug_id}=[status]`).join(', ')}. Evidence: [refs]. CSV updated: [yes/no]. Hourly note updated: [yes/no]. Remaining blocker: [short blocker or none]. Next: [next action].\`\`
`;

const txt = `${now.slot} | QA ticket-close helper ready | bugs=${selected.map(bug => bug.bug_id).join(', ')} | hourly=${hourly.summary_line || 'n/a'}\n`;

ensureDir(outJson);
fs.writeFileSync(outJson, JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(outMd, md + '\n');
fs.writeFileSync(outTxt, txt);
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
