import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const API_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * รวมค่าตั้งค่าทั้งหมดไว้ที่เดียว — ที่อื่นห้ามอ่าน process.env ตรง ๆ
 * ทำให้รู้ได้ทันทีว่าแอปนี้ต้องการค่าอะไรบ้าง
 */
export const config = {
  dbFile: path.join(API_ROOT, 'data', 'campus.db'),
  schemaFile: path.join(API_ROOT, 'data', 'schema.sql'),
  port: Number(process.env.PORT ?? 3001),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  get isProduction() {
    return this.nodeEnv === 'production';
  },
};
