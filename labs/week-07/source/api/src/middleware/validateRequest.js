import { AppError } from "./errorHandler.js";

const REQUEST_TYPES = ['แจ้งซ่อม', 'บริการบัญชีผู้ใช้', 'ขอใช้อุปกรณ์', 'อื่น ๆ'];
const PRIORITIES = ['normal', 'urgent'];

function readText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/** ตรวจ body ก่อนถึง controller — ไม่ผ่านตอบ 400 พร้อมบอกว่าผิดตรงไหน */
export function validateRequest(req, res, next) {
  const input = req.body;
  const errors = [];

  if (!input || typeof input !== 'object') {
    throw new AppError(`ต้องส่งข้อมูลคำร้องมาด้วย` , 400);
  }
  if (readText(input.requesterName).length < 2) errors.push('ชื่อผู้แจ้งต้องมีอย่างน้อย 2 ตัวอักษร');
  if (!REQUEST_TYPES.includes(input.requestType)) errors.push('ประเภทคำร้องไม่ถูกต้อง');
  if (!readText(input.location)) errors.push('กรุณาระบุสถานที่');
  if (readText(input.details).length < 10) errors.push('รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร');
  if (!PRIORITIES.includes(input.priority)) errors.push('ความเร่งด่วนต้องเป็น normal หรือ urgent');

  if (errors.length > 0) {
    throw new AppError(`ข้อมูลคำร้องไม่ถูกต้อง  ${errors}` , 400); `ไม่พบคำร้องรหัส ${req.params.id}`
  }
  next();
}
