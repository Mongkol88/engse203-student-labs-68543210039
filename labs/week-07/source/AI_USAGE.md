# AI_USAGE — LAB 07

บันทึกการใช้ AI ระหว่างทำงาน · **ใช้ AI ได้ แต่ต้องเป็นเจ้าของโค้ดที่ส่ง**

> ผู้สอนจะสุ่มถามจากโค้ดที่ส่ง — ถ้าอธิบายไม่ได้ คะแนนส่วนนั้นจะถูกทบทวน

---

## ครั้งที่ 1

**ถามอะไร**  
วิธีปรับให้ปุ่มเปลี่ยนสถานะ (`.button.change`) ใน `RequestCard.jsx` ย้ายไปอยู่ตำแหน่งล่างขวาของแต่ละการ์ด

**AI ตอบว่าอย่างไร (สรุปสั้น)**  
จัดกลุ่มปุ่ม Action ไว้ในคอนเทนเนอร์ `.request-card-actions` แล้วใช้ CSS Flexbox (`flex-direction: column; justify-content: space-between; align-items: flex-end;`) บนหน้าจอ Desktop เพื่อให้ปุ่มลบอยู่บนขวา และปุ่มเปลี่ยนสถานะอยู่ล่างขวา พร้อมทั้งปรับใน Mobile ให้จัดชิดขวาล่าง

**ใช้ส่วนไหน / แก้เองตรงไหน**  
นำโครงสร้าง `<div className="request-card-actions">` ไปใส่ใน `RequestCard.jsx` และเพิ่มคลาส CSS ใน `styles.css`

**เข้าใจโค้ดที่ได้มาไหม** ☑ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## ครั้งที่ 2

**ถามอะไร**  
วิธีใช้งาน `export class AppError` ใน `errorHandler.js` และทำไมถึงเกิด Error ตอน `import` ใน `requestController.js`

**AI ตอบว่าอย่างไร (สรุปสั้น)**  
`export class AppError` เป็น Named Export เวลา `import` ต้องใช้ `{ AppError }` มีปีกกาครอบเสมอ ไม่สามารถ `import AppError` แบบ default ได้ และเวลาเรียกใช้ `throw new AppError(message, status)` ต้องส่ง message เป็นข้อความ string

**ใช้ส่วนไหน / แก้เองตรงไหน**  
แก้ไขบรรทัด `import { AppError }` ใน `requestController.js` และ `validateRequest.js` พร้อมทั้งเพิ่ม `import { config } from '../config.js'` ใน `errorHandler.js`

**เข้าใจโค้ดที่ได้มาไหม** ☐ เข้าใจทั้งหมด ☑ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## ครั้งที่ 3

**ถามอะไร**  
การทำงานของ `asyncHandler` ใน Challenge และการนำไปใช้งานร่วมกับ middleware เช่น `validateRequest`

**AI ตอบว่าอย่างไร (สรุปสั้น)**  
`asyncHandler` รับ parameter `fn` ที่เป็น Function เพื่อครอบ `Promise.resolve(fn(...)).catch(next)` ดักจับ async error ส่งต่อให้ error handler อัตโนมัติ โดยไม่สามารถส่ง Object ทั่วไปเข้าไปที่ `fn` ได้ และใน routing สามารถส่ง `validateRequest` แยกกับ `asyncHandler(controller.createRequest)` ได้

**ใช้ส่วนไหน / แก้เองตรงไหน**  
ย้าย `asyncHandler` ไปไว้ใน `errorHandler.js` ตามที่ checker ตรวจ และ import ไปใช้ครอบ controller methods ใน `requestRoutes.js`

**เข้าใจโค้ดที่ได้มาไหม** ☐ เข้าใจทั้งหมด ☑ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## ครั้งที่ 4

**ถามอะไร**  
สาเหตุที่หน้าเว็บขึ้น error `requests.filter is not a function` และกลายเป็นหน้าขาวหลังจากกดปุ่มเปลี่ยนสถานะ รวมถึงหน้าที่ของฟังก์ชัน `getRequests()` ใน `requestService.js`

**AI ตอบว่าอย่างไร (สรุปสั้น)**  
ฟังก์ชัน `updateRequestStatus()` เรียก API แล้วได้ข้อมูลคำร้องที่อัปเดตกลับมาเป็น Object เพียงหนึ่งรายการ แต่โค้ดเดิมนำ Object นั้นไปใส่ใน state `requests` ซึ่งควรเป็น Array ทำให้การเรียก `requests.filter()` ใน `DashboardPage.jsx` เกิด error และ React หยุดแสดงผลจนเป็นหน้าขาว แม้ว่าสถานะใน API จะอัปเดตสำเร็จแล้ว วิธีแก้คือใช้ `map()` แทนที่เฉพาะรายการที่มี `id` ตรงกัน และคงรายการอื่นไว้ใน Array เดิม ส่วน `getRequests()` ใช้เรียก API เพื่อโหลดรายการคำร้องทั้งหมดหรือกรองตามสถานะ พร้อมมี scenario สำหรับทดสอบกรณี error และไม่มีข้อมูล

**ใช้ส่วนไหน / แก้เองตรงไหน**  
แก้ `handleChangeStatus()` ใน `DashboardPage.jsx` ให้ใช้ `setRequests()` แบบ functional update และใช้ `map()` แทนที่คำร้องที่อัปเดตแล้ว โดยไม่แทนที่ state ทั้งก้อนด้วย Object

**เข้าใจโค้ดที่ได้มาไหม** ☑ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## สรุป

- ส่วนที่เขียนเองทั้งหมด: การเชื่อมต่อ Frontend กับ API ใน `requestService.js` (PUT/DELETE/CORS), การกรอกข้อมูลใน `API_CONTRACT.md`, AppError ไฟล์ฺ errorHandler.js เเละ asyncHandler — ห่อ handler ที่เป็น async ไฟล์ errorHandler.js เเละ requestRoutes.js
- ส่วนที่ AI ช่วย: การแก้ปัญหา Named Export ของ `AppError`, การวาง Layout CSS ปุ่มในการ์ด และการวิเคราะห์ปัญหา state ของรายการคำร้องหลังเปลี่ยนสถานะ
- ส่วนที่ยังไม่มั่นใจ: ในส่วนของ Challenge หัวข้อ 1 · AppError — กำหนด status เองได้ เเละ  2 · asyncHandler — ห่อ handler ที่เป็น async
