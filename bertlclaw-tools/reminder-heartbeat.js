#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const statePath = path.join(root, 'state', 'bertlclaw-reminders.json');
const logPath = path.join(root, 'logs', 'bertlclaw-operations.log');

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
    hourMinute: `${parts.hour}:${parts.minute}`,
    stamp: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute} CEST`,
    fullStamp: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CEST`,
  };
}

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

function writeJson(filePath, data) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

function appendLog(line) {
  ensureDir(logPath);
  fs.appendFileSync(logPath, line + '\n');
}

const state = readJson(statePath, {
  version: 1,
  timezone: 'Europe/Vienna',
  last_hourly_update_at: null,
  last_daily_github_ticket_reminder_at: null,
  last_run_at: null,
  runs: [],
});

const now = nowVienna();
const hourSlot = `${now.date} ${now.hourMinute}`;
const daySlot = now.date;
const dueHourly = state.last_hourly_update_at !== hourSlot;
const dueDailyReminder = state.last_daily_github_ticket_reminder_at !== daySlot;

const emitted = [];
if (dueHourly) {
  appendLog(`[${now.stamp}] hourly update due/recorded by reminder-heartbeat.js (audit slot ${hourSlot})`);
  state.last_hourly_update_at = hourSlot;
  emitted.push('hourly_update');
}
if (dueDailyReminder) {
  appendLog(`[${now.stamp}] daily ticket reminder due/recorded by reminder-heartbeat.js (audit day ${daySlot})`);
  state.last_daily_github_ticket_reminder_at = daySlot;
  emitted.push('daily_github_ticket_reminder');
}
state.last_run_at = `${now.date} ${now.time}`;
state.runs = [
  {
    at: `${now.date} ${now.time}`,
    emitted,
  },
  ...(state.runs || []),
].slice(0, 50);

writeJson(statePath, state);
process.stdout.write(JSON.stringify({ ok: true, now, emitted, statePath, logPath }, null, 2) + '\n');
