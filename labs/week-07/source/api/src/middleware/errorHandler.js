/** จับ error ที่หลุดมาจากทุก route — ต้องมี 4 พารามิเตอร์ Express ถึงจะรู้ว่าเป็น error handler */
import { config } from '../config.js';

export class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}


export function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;

  if (status >= 500) {
    console.error('เกิดข้อผิดพลาดภายใน:', err.message);
  }

  res.status(status).json({
    error: status >= 500 ? 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' : err.message,
    ...(config.isProduction ? {} : { stack: err.stack?.split('\n').slice(0, 3) }),
  });
}

/** ไม่มี route ไหนตรง */
export function notFound(req, res) {
  throw new AppError(`ไม่พบเส้นทาง ${req.method} ${req.originalUrl}`, 404);
}

export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
