# AI_USAGE — LAB 11

บันทึกการใช้ AI ระหว่างทำงาน · **ใช้ AI ได้ แต่ต้องเป็นเจ้าของโค้ดที่ส่ง**

> ผู้สอนจะสุ่มถามจากโค้ดที่ส่ง — ถ้าอธิบายไม่ได้ คะแนนส่วนนั้นจะถูกทบทวน


---

## ครั้งที่ 1

**ถามอะไร**  
1. ทำไมรัน `check-week11.mjs` แล้วหัวข้อ `[TODO] CHAL ⭐ มี CI (.github/workflows)` ไม่ขึ้นเช็คถูก  
2. ทำไมตอน Deploy ขึ้น Render ถึงเกิด Error `Cannot find package 'libsql'` ทั้งที่เพิ่มไว้ใน `api/package.json` แล้ว

**AI ตอบว่าอย่างไร (สรุปสั้น)**  
1. ตัวตรวจ `check-week11.mjs` อ้างอิง `ROOT` จากโฟลเดอร์ `labs/week-11/source/` จึงตรวจหาโฟลเดอร์ `.github/workflows` ภายใน `labs/week-11/source/` ในขณะที่ไฟล์เดิมวางอยู่แค่ที่ Root ของ Repository  
2. บน Render ตั้งค่า Build Command ไว้แค่ติดตั้งและ Build ฝั่ง `frontend` แต่ไม่ได้สั่ง `npm install` ในโฟลเดอร์ `api/` ทำให้แพ็กเกจ `libsql` ใน `api/package.json` ไม่ถูกติดตั้งตอน Build บน Render

**ใช้ส่วนไหน / แก้เองตรงไหน**  
คัดลอกไฟล์ `.github/workflows/week11-check.yml` มาไว้ใน `labs/week-11/source/.github/workflows/` ด้วย และปรับ Build Command บน Render ให้เรียก `npm run build` (ซึ่งมี `npm install --prefix api` ครบทั้งสองฝั่ง)

**เข้าใจโค้ดที่ได้มาไหม** ☑ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## ครั้งที่ 2

**ถามอะไร**  
การนำโค้ดปุ่มเปลี่ยนสถานะจาก Week 07 มาปรับใช้กับ Week 11 เพื่อให้หน้าเว็บทำงานได้ครบทั้ง "ดู · เพิ่ม · เปลี่ยนสถานะ · ลบคำร้อง"

**AI ตอบว่าอย่างไร (สรุปสั้น)**  
ต้องนำปุ่มเปลี่ยนสถานะและ prop `onChangeStatus` จาก Week 07 มาใส่ใน `RequestCard.jsx`, ส่งต่อผ่าน `RequestList.jsx`, เพิ่มฟังก์ชัน `handleChangeStatus` ใน `DashboardPage.jsx`, ปรับ `updateRequestStatus` ใน `frontend/src/services/requestService.js` ให้คืนค่ารายการล่าสุดด้วย `getRequests()`, และเพิ่มคลาส `.button.change` กับ `.request-card-actions` ใน `styles.css`

**ใช้ส่วนไหน / แก้เองตรงไหน**  
คัดลอกและปรับโค้ดใน `RequestCard.jsx`, `RequestList.jsx`, `DashboardPage.jsx`, `requestService.js` และ `styles.css` ของฝั่ง `frontend` แล้วรัน `npm run build` ใหม่เพื่ออัปเดต `frontend/dist`

**เข้าใจโค้ดที่ได้มาไหม** ☑ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## ครั้งที่ 3

**ถามอะไร**  
ขอคำอธิบายการทำงานของโค้ดเพื่อเตรียมนำเสนอวิดีโอช่วง B ได้แก่:  
- ความหมายของ HTTP Status `503` และที่มาของ `getDbStatus()` ใน `healthRoutes.js`  
- ความหมายของ Regex `/^\/(?!api).*/` ใน `app.js` และตัวเลือก `fetch` ใน `apiClient.js`

**AI ตอบว่าอย่างไร (สรุปสั้น)**  
- Status `503 (Service Unavailable)` ใช้แจ้งเมื่อเซิร์ฟเวอร์เปิดติดแต่ต่อฐานข้อมูลไม่ได้ โดยเรียก `getDbStatus()` จาก `api/src/services/requestService.js` เพื่อเช็กการเชื่อมต่อและนับตารางในฐานข้อมูล  
- `/^\/(?!api).*/` คือ Negative Lookahead ที่จับทุก URL ที่ไม่ได้ขึ้นต้นด้วย `/api` เพื่อส่งไฟล์ `index.html` ของ React กลับไปในโหมด Production

**ใช้ส่วนไหน / แก้เองตรงไหน**  
ใช้ทำความเข้าใจลำดับการไหลของข้อมูลตั้งแต่ Frontend → API → Database เพื่อใช้พูดอธิบายโค้ดจริงในวิดีโอสาธิตช่วง B

**เข้าใจโค้ดที่ได้มาไหม** ☑ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## ครั้งที่ 4

**ถามอะไร**  
หัวข้อ `เปิดระบบครบ 3 ชั้น (React + API + DB)` ในคู่มือ `LAB11_TAKEHOME_GUIDE_TH.md` (บรรทัดที่ 165) สำหรับอัดวิดีโอสาธิตช่วง A ต้องเปิดและแสดงผลตรงไหนบ้าง

**AI ตอบว่าอย่างไร (สรุปสั้น)**  
ให้แบ่งเปิดแสดงผล 2 ส่วนควบคู่กันในคลิป ได้แก่:
1. **ใน Terminal:** เปิด 2 หน้าต่างคู่กันเพื่อรัน Backend API (`cd api && npm run dev` พอร์ต `3001` ที่เชื่อมกับฐานข้อมูล SQLite) และรัน Frontend (`cd frontend && npm run dev` พอร์ต `5173`)
2. **ใน Web Browser:** เปิดหน้าเว็บ React (`http://localhost:5173`) ที่ดึงข้อมูลจาก API มาแสดงบน Dashboard คู่กับหน้า Health Check (`http://localhost:3001/api/health`) ที่แสดง `"status": "ok"` และ `"database": { "connected": true }`

**ใช้ส่วนไหน / แก้เองตรงไหน**  
นำไปใช้จัดลำดับการเปิด Terminal และ Browser เพื่ออัดวิดีโอสาธิตการทำงานครบ 3 ชั้นในพาร์ทช่วง A

**เข้าใจโค้ดที่ได้มาไหม** ☑ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## สรุป

- ส่วนที่เขียนและตั้งค่าเองทั้งหมด: การรวมศูนย์ `config.js`, การสร้าง `healthRoutes.js`, การตั้งค่า Production Static Serving ใน `app.js`, การเขียนเอกสาร `README.md` / `DATABASE_CHOICES.md`, การเชื่อมฐานข้อมูล Turso (`openDatabase`) และการตั้งค่า Deploy ขึ้น Render
- ส่วนที่ AI ช่วย: วิเคราะห์สาเหตุที่ตัวตรวจไม่พบ `.github/workflows` และที่ Render หา `libsql` ไม่เจอ (ครั้งที่ 1), แนะนำการนำโค้ดปุ่มเปลี่ยนสถานะจาก Week 07 มาปรับใช้กับ Week 11 (ครั้งที่ 2), อธิบายความหมายของ Status `503` / `getDbStatus()` / Regex `/^\/(?!api).*/` / `apiClient.js` สำหรับเตรียมอัดคลิปช่วง B (ครั้งที่ 3) และแนะนำลำดับการเปิดแสดงผลครบ 3 ชั้นสำหรับอัดคลิปช่วง A (ครั้งที่ 4)
- ส่วนที่ยังไม่มั่นใจ: รูปแบบการเขียน Regular Expression เชิงลึก (`/^\/(?!api).*/`) สำหรับดักจับ Route ใน `app.js`
