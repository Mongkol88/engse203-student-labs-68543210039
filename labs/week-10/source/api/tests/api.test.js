import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

let app;
before(async () => { await loadSeed(); app = createApp(); });

const validRequest = {
  requesterName: 'ทดสอบ ระบบ',
  requestType: 'แจ้งซ่อม',
  location: 'C3-401',
  details: 'รายละเอียดยาวพอสมควรจริง',
  priority: 'normal',
};

const wrongvalidRequest = {
  requesterName: 'ทดสอบ ระบบ',
  requestType: '',
  location: 'C3-401',
  details: 'รายละเอียดยาวพอสมควรจริง',
  priority: 'normal',
};


/**
 * TODO W10-TEST (🏠 CP33) · เขียน test อย่างน้อย 6 เคส ที่ยิงเข้าฐานข้อมูลจริง
 *   1. GET /api/requests → 200 และได้ array
 *   2. คืน requesterName ไม่ใช่ requester_id
 *   3. GET /:id พบ → 200 · ไม่พบ → 404
 *   4. POST ถูกต้อง → 201
 *   5. POST ไม่ครบ → 400
 *   6. ยิง SQL injection ผ่าน ?status= แล้วต้องไม่หลุด
 */
describe('GET /api/requests', () => {
  test('คืน array พร้อม 200', async () => {
    assert.ok(true, 'ยังไม่ได้เขียน — ดู TODO W10-TEST');
  });
});


test('คืน requesterName ไม่ใช่ requester_id', async () => {
  const r = await request(app).get('/api/requests');
  assert.ok('requesterName' in r.body[0]);
  assert.ok(!('requester_id' in r.body[0]));
});

describe('GET /api/requests/:id พบ : ไม่พบ → 404', () => {
  test('คืนรายการเฉพาะ REQ-001 status 200', async () => {
    const res = await request(app).get('/api/requests/REQ-001');
    assert.equal(res.status, 200);
    assert.ok(res.body.id);
  });
  test('ไม่พบรายการเฉพาะ REQ-999 status 404', async () => {
    const res = await request(app).get('/api/requests/REQ-999');
    assert.equal(res.status, 404);
  });
});

describe('POST ข้อมูลถูกต้อง', () => {
  test('สร้างรายการสำเร็จ และ status เป็น pending', async () => {
    const res = await request(app).post('/api/requests/').send(validRequest);
    assert.equal(res.status, 201);
    assert.equal(res.body.status, 'pending');
  });
});

describe('POST ข้อมูลไม่ครบ', () => {
  test('สร้างรายการไม่สำเร็จ ข้อมูลไม่ครบ', async () => {
    const res = await request(app).post('/api/requests/').send(wrongvalidRequest);
    assert.equal(res.status, 400);
  });
});




test('SQL injection ผ่าน ?status= ไม่หลุด', async () => {
  const evil = encodeURIComponent("x' OR '1'='1");
  const r = await request(app).get(`/api/requests?status=${evil}`);
  assert.equal(r.status, 200);
  assert.equal(r.body.length, 0);
});