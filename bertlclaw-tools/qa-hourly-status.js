#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const draftTool = path.join(root, 'bertlclaw-tools', 'qa-hourly-draft.js');
const draftJsonPath = path.join(root, 'qa-artifacts', 'hourly-update-draft', 'latest.json');
const outDir = path.join(root, 'qa-artifacts', 'hourly-status');
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

const args = process.argv.slice(2);
const hoursArg = args.find(arg => arg.startsWith('--hours='));
const hours = Math.max(1, Number(hoursArg ? hoursArg.split('=')[1] : 6) || 6);

execFileSync(process.execPath, [draftTool, '--refresh', `--hours=${hours}`], { cwd: root, stdio: 'pipe' });
const draft = readJson(draftJsonPath, null);
if (!draft) {
  process.stderr.write('Missing hourly draft artifact after refresh.\n');
  process.exit(1);
}

const summaryLine = `[${draft.slot || 'n/a'}] QA hourly status ready — status=${draft.stream?.status || 'unknown'}, queue=${draft.stream?.retest_queue ?? 'n/a'}, blockers=${draft.stream?.manual_blockers ?? 'n/a'}, top_done=${draft.this_hour_done?.[0] || 'none'}, top_open=${draft.open_pressure?.[0] || 'none'}, next=${draft.next_moves?.[0] || 'none'}`;
const md = `# BertlClaw QA Hourly Status\n\nGenerated: ${draft.generated_at || 'n/a'}\nSlot: ${draft.slot || 'n/a'}\n\n## One-line status\n- ${summaryLine}\n\n## Copy-ready hourly update\n\n\`\`\`text\n${draft.draft_text || ''}\n\`\`\`\n\n## Compact version\n\n\`\`\`text\n${draft.compact_text || ''}\n\`\`\`\n`;
const report = {
  generated_at: draft.generated_at || null,
  slot: draft.slot || null,
  summary_line: summaryLine,
  draft_path: draftJsonPath,
  draft,
};

ensureDir(outJson);
fs.writeFileSync(outJson, JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(outMd, md + '\n');
fs.writeFileSync(outTxt, `${summaryLine}\n\n${draft.compact_text || ''}\n`);
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
