import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from '../config.js';
import { DatabaseSync } from 'node:sqlite';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCHEMA_FILE = path.resolve(HERE, '..', 'data', 'schema.sql');

const db = new DatabaseSync(config.dbFile);
let users = [];

const USER_SHAPE = `
  SELECT id,
  name,
  department,
  email
  FROM users`;

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
    ? db.prepare(`${USER_SHAPE} ORDER BY id`).all(status)
    : db.prepare(`${USER_SHAPE} ORDER BY id`).all();
}

export function findById(id) {
  return db.prepare(`${USER_SHAPE} WHERE id = ?`).get(id) ?? null;
}

export function findRequestById(userId) {
  if (!findById(userId)) return null
  return db.prepare(`${SELECT_SHAPE} WHERE r.requester_id = ? ORDER BY r.id`).all(userId) ?? null;
}

//MK