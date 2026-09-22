import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from '../config.js';
import { DatabaseSync } from 'node:sqlite';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCHEMA_FILE = path.resolve(HERE, '..', 'data', 'schema.sql');

/**
 * Week 10 — เปลี่ยน service จากอ่านไฟล์ JSON เป็นฐานข้อมูล SQLite
 *
 * ตอนนี้ยังเป็นเวอร์ชัน Week 07 (อ่านไฟล์ JSON) อยู่
 * งานของสัปดาห์นี้คือเปลี่ยนให้ใช้ node:sqlite
 *
 * ⚠ กฎเหล็ก: signature ของทุกฟังก์ชันต้องเหมือนเดิมทุกตัว
 *   → controller และ frontend จะได้ไม่ต้องแก้เลย
 */

// ── ของเดิม Week 07 (อ่านไฟล์ JSON) — จะถูกแทนที่ ──
//const HERE = path.dirname(fileURLToPath(import.meta.url));
//const DATA = path.resolve(HERE, '../..', 'data', 'requests.json');
const db = new DatabaseSync(config.dbFile);
let requests = [];

const SELECT_SHAPE = `
  SELECT r.id,
         u.name          AS requesterName,
         r.request_type  AS requestType,
         r.location,
         r.details,
         r.priority,
         r.status
  FROM requests r
  JOIN users u ON u.id = r.requester_id`;


export async function loadSeed() {
  db.exec('PRAGMA foreign_keys = ON');

  const ready = db.prepare(
    "SELECT COUNT(*) c FROM sqlite_master WHERE type='table' AND name='requests'"
  ).get().c;

  if (!ready) {
    const schemaSql = readFileSync(SCHEMA_FILE, 'utf8');
    db.exec(schemaSql);
  }
}

export function findAll({ status } = {}) {
  return status
    ? db.prepare(`${SELECT_SHAPE} WHERE r.status = ? ORDER BY r.id`).all(status)
    : db.prepare(`${SELECT_SHAPE} ORDER BY r.id`).all();
}

export function findById(id) {
  return db.prepare(`${SELECT_SHAPE} WHERE r.id = ?`).get(id) ?? null;
}

export function create(input) {
  const id = nextId();
  db.exec('BEGIN');
  try {
    const requesterId = resolveUserId(input.requesterName.trim());
    db.prepare(`INSERT INTO requests (id, requester_id, request_type, location, details, priority)
     VALUES (?, ?, ?, ?, ?, ?)`).run(
    id,
    resolveUserId(input.requesterName.trim()),
    input.requestType,
    input.location.trim(),
    input.details.trim(),
    input.priority ?? 'normal'
  );
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
  return findById(id);   
}

export function updateStatus(id, status) {
  const result = db.prepare('UPDATE requests SET status = ? WHERE id = ?')
                   .run(status, id);
  return result.changes ? findById(id) : null;
}

export function remove(id) {
  const target = findById(id);      // ① หาก่อน
  if (!target) return null;         // ② ไม่พบ → null
  db.prepare('DELETE FROM requests WHERE id = ?').run(id);
  return target;                    // ③ คืนของที่ลบ
}

function nextId() {
  const row = db.prepare(
    "SELECT id FROM requests WHERE id LIKE 'REQ-%' ORDER BY id DESC LIMIT 1"
  ).get();
  const n = row ? Number(String(row.id).replace('REQ-', '')) + 1 : 1;
  return `REQ-${String(n).padStart(3, '0')}`;
}


function resolveUserId(name) {
  const found = db.prepare('SELECT id FROM users WHERE name = ?').get(name);
  if (found) return found.id;                  // มีแล้ว — ใช้ id เดิม

  const slug = Date.now().toString(36);
  return db.prepare('INSERT INTO users (name, department, email) VALUES (?, ?, ?)')
           .run(name, 'ไม่ระบุ', `user-${slug}@rmutl.ac.th`).lastInsertRowid;
}