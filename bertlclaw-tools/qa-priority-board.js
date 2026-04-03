#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const bugsPath = path.join(root, 'bertlclaw-qa-active-bugs.csv');
const outDir = path.join(root, 'qa-artifacts', 'priority-board');
const outJson = path.join(outDir, 'latest.json');
const outMd = path.join(outDir, 'latest.md');

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
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CEST`;
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

function laneFor(bug) {
  if (bug.status === 'blocked_manual_access') return 'manual-blocker';
  if (bug.status === 'ready_for_retest') return 'retest-first';
  if (bug.status === 'retested_fail') return 'fix-now';
  if (bug.status === 'new') return 'triage-next';
  if (bug.status === 'partial') return 'resolve-gaps';
  return 'monitor';
}

function summaryLine(bug) {
  const access = bug.needs_manual_access === 'yes' ? 'manual access required' : 'workspace-actionable';
  return `${bug.bug_id} [${bug.severity}/${bug.status}] — ${bug.title} | ${bug.page_or_flow} | next: ${bug.next_action} | ${access}`;
}

function handoffFields(bug) {
  return {
    bug_id: bug.bug_id,
    title: bug.title,
    severity: bug.severity,
    current_status: bug.status,
    lane: laneFor(bug),
    page_or_flow: bug.page_or_flow,
    environment: bug.environment,
    failure_summary: bug.actual,
    expected_result: bug.expected,
    evidence: bug.evidence,
    next_action: bug.next_action,
    retest_after: bug.retest_after,
    owner: bug.owner,
    needs_manual_access: bug.needs_manual_access,
    operator_call: bug.status === 'ready_for_retest'
      ? 'Retest now before new exploratory QA.'
      : bug.status === 'blocked_manual_access'
        ? 'Escalate human/manual blocker immediately.'
        : bug.status === 'retested_fail'
          ? 'Fix now, then bounce back to QA with a focused retest note.'
          : 'Triage and convert to a concrete implementation step.',
  };
}

const bugs = parseCsv(readText(bugsPath));
const active = bugs.filter(bug => !['closed', 'retested_pass'].includes(bug.status));
const sorted = [...active].sort((a, b) => {
  const sev = severityRank(a.severity) - severityRank(b.severity);
  if (sev !== 0) return sev;
  const status = statusRank(a.status) - statusRank(b.status);
  if (status !== 0) return status;
  return a.bug_id.localeCompare(b.bug_id);
});

const lanes = {
  'manual-blocker': sorted.filter(b => laneFor(b) === 'manual-blocker'),
  'retest-first': sorted.filter(b => laneFor(b) === 'retest-first'),
  'fix-now': sorted.filter(b => laneFor(b) === 'fix-now'),
  'triage-next': sorted.filter(b => laneFor(b) === 'triage-next'),
  'resolve-gaps': sorted.filter(b => laneFor(b) === 'resolve-gaps'),
  'monitor': sorted.filter(b => laneFor(b) === 'monitor'),
};

const top = sorted.slice(0, 5).map(handoffFields);
const report = {
  generated_at: viennaNow(),
  totals: {
    active_count: active.length,
    manual_blockers: lanes['manual-blocker'].length,
    ready_for_retest: lanes['retest-first'].length,
    retested_fail: lanes['fix-now'].length,
    new_items: lanes['triage-next'].length,
  },
  top_priority: top,
  lanes: Object.fromEntries(Object.entries(lanes).map(([key, items]) => [key, items.map(handoffFields)])),
};

const laneOrder = [
  ['manual-blocker', 'Manual blocker'],
  ['retest-first', 'Retest first'],
  ['fix-now', 'Fix now'],
  ['triage-next', 'Triage next'],
  ['resolve-gaps', 'Resolve gaps'],
  ['monitor', 'Monitor'],
];

const md = `# BertlClaw QA Priority Board\n\nGenerated: ${report.generated_at}\n\n## At a glance\n- Active items: **${report.totals.active_count}**\n- Manual blockers: **${report.totals.manual_blockers}**\n- Ready for retest: **${report.totals.ready_for_retest}**\n- Retested fail / fix-now: **${report.totals.retested_fail}**\n- New items needing triage: **${report.totals.new_items}**\n\n## Top 5 next moves\n${top.length ? top.map((item, index) => `${index + 1}. ${item.bug_id} [${item.severity}/${item.current_status}] — ${item.title}\n   - flow: ${item.page_or_flow}\n   - why now: ${item.failure_summary}\n   - next move: ${item.next_action}\n   - retest handoff: ${item.operator_call}`).join('\n') : '- none'}\n\n## Lane view\n${laneOrder.map(([key, label]) => `### ${label} (${lanes[key].length})\n${lanes[key].length ? lanes[key].map(item => `- ${summaryLine(item)}`).join('\n') : '- none'}`).join('\n\n')}\n\n## Copy-ready retest → fix handoff starters\n${top.length ? top.map(item => `### ${item.bug_id}\n- Severity / status: ${item.severity} / ${item.current_status}\n- Flow: ${item.page_or_flow}\n- Failure: ${item.failure_summary}\n- Expected: ${item.expected_result}\n- Evidence: ${item.evidence}\n- Builder action: ${item.next_action}\n- QA retest after fix: ${item.retest_after || 'set a concrete retest trigger'}\n`).join('\n') : '- none'}\n`;

ensureDir(outJson);
fs.writeFileSync(outJson, JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(outMd, md + '\n');
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
