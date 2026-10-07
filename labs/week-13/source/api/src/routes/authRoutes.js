import { Router } from 'express';
import * as authService from '../services/authService.js';
import { validateLoginInput } from '../validators/requestValidator.js';

// route ให้มาแล้ว — งานหลักอยู่ใน services/authService.js (CP50)
const router = Router();

const loginAttempts = new Map(); // key = email, value = { count, resetAt }
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 นาที

export function resetLoginLimiter() {
  loginAttempts.clear(); // สั่งล้างประวัติทั้งหมดกลับเป็น 0
}

router.post('/login', (req, res) => {
  const email = req.body.email;
  const now = Date.now();
  const record = loginAttempts.get(email);
  const errors = validateLoginInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง', details: errors });
  }

  if (record) {
    if (now > record.resetAt) {
      loginAttempts.delete(email); // พ้น 15 นาทีแล้ว ให้รีเซ็ต
    } else if (record.count >= MAX_ATTEMPTS) {
      return res.status(429).json({ error: 'เข้าสู่ระบบผิดเกินกำหนด กรุณารอ 15 นาที' });
    }
  }
  const result = authService.login(req.body.email, req.body.password);

  if (!result) {
    // ── ล็อกอินผิด → บันทึกนับจำนวนครั้งเพิ่ม ──
    const current = loginAttempts.get(email) ?? { count: 0, resetAt: now + WINDOW_MS };
    current.count += 1;
    loginAttempts.set(email, current);
    return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  }
  // ล็อกอินถูก → ล้างประวัติของอีเมลนี้
  loginAttempts.delete(email);
  res.status(200).json(result);
});

export default router;
