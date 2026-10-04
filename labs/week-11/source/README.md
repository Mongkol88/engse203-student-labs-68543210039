# Campus Service — Full-Stack (Week 11 · starter)

## 1.ภาพรวม
### ระบบทำอะไร
เป็นระบบ campus Service ที่จัดการคำร้องในมหาวิยาลัย ทำให้นักศึกษาสร้างคำร้องได้ เช่น การเเจ้งซ่อม, ขอใช้ห้อง เเละ บริการบัญชีผู้ใช้
feature หลักๆ มีดังนี้

1.สร้างคำร้อง มีให้ใส่ ชื่อผู้แจ้ง, ประเภทคำร้อง, สถานที่, รายละเอียด เเละ ความเร่งด่วน พร้อมทั้งมีการ validate ความถูกต้องของข้อมูลก่อนส่ง

2.หน้า Dashboard เเสดงรายการคำร้องทั้งหมด มีปุ่มกรองสถานะที่ รอดำเนินการ, กำลังดำเนินการ เเละ เสร็จสิน พร้อมทั้งมีปุ่มลบคำร้อง

### ใช้เทคโนโลยีอะไร
| ส่วนประกอบ | เทคโนโลยี | หน้าที่ |
|---|---|---|
| Frontend | React, Vite | แสดงผล UI ฟอร์มแจ้งคำร้อง รายการคำร้อง และตัวกรองสถานะ |
| Backend | Node.js, Express, Morgan, CORS | ใช้กำหนด routes พร้องทั้งใช้ในการตรวจสอบข้อมูลที่ผู้ใช้กรอกในการสร้างคำร้องก่อนจะจัดเก็บข้อมูลลง Database เเละใช้สำหรับควบคุมการสร้างคำร้องเเละลบคำร้อง |
| Database | SQLite | ใช้สำหรับจัดเก็บข้อมูลคำร้อง |

**รายละเอียดแต่ละชั้น:**
- ชั้นที่ 1 — Frontend : พัฒนาด้วย React + Vite ทำหน้าที่แสดงรายการคำร้อง ฟอร์มสร้างคำร้อง และปุ่มกรองสถานะ โดยติดต่อกับ backend ผ่าน API ด้วยข้อมูลแบบ JSON
- ชั้นที่ 2 — Backend API : พัฒนาด้วย Express แยกหน้าที่เป็นสัดส่วน ได้แก่ routes/ ใช้กำหนดเส้นทาง URL, controllers/ ค่อยรับ-ตอบ HTTP Request/Response, services/ ใช้คุยกับฐานข้อมูล, และ middleware/ จัดการ Error 404/500 เเละใช้ validate คำร้องเมื่อสร้างใหม่
- ชั้นที่ 3 — Database : ใช้ฐานข้อมูล SQLite campus.db สร้างตารางตามโครงสร้างใน schema.sql และมีข้อมูลเริ่มต้นใน initialRequests.json

## 2.สถาปัตยกรรม 3 ชั้น

```markdown

┌─────────┐  HTTP   ┌──────────┐  SQL   ┌─────────┐
│ React   │ ──────► │ Express  │ ─────► │ SQLite  │
└─────────┘  JSON   └──────────┘  rows  └─────────┘

```

| ชั้น | หน้าที่ | โฟลเดอร์ |
|---|---|---|
| Frontend | หน้าจอผู้ใช้และจัดการ State การแสดงผล | frontend/ |
| API | จัดการ  route · controller · service · middleware | api/src/ |
| Database | เก็บข้อมูลคำร้อง | api/data/ |


## 3.วิธีรัน (dev)

**ขั้นตอนการรัน:**
1. **เปิด Terminal 1 สำหรับ API :**
   ```bash
   cd labs/week-11/source/api
   npm install
   npm run db:setup
   npm run dev
   ```
   เเล้วเปิด http://localhost:5173
2. **เปิด Terminal 2 สำหรับ Frontend:**
   ```bash
   cd labs/week-11/source/frontend
   npm install
   npm run dev
   ```
   เเล้วเปิด http://localhost:3001

## 4.วิธีรัน (production)
```bash
# 1. Build ฝั่ง Frontend
cd source/api
npm install --include=dev
npm run build
# 2. รันฝั่ง API ในโหมด Production
cd ../api
npm install
NODE_ENV=production npm start
```

เมื่อรันสำเร็จ สามารถเปิดใช้งานได้ที่พอร์ตเดียว:
- **หน้าเว็บ:** `http://localhost:3001/`
- **API Endpoints:** `http://localhost:3001/api/requests`

## 5.Environment Variables

### 1) ฝั่ง Backend `api/.env`
```env
# โหมดการทำงาน (development หรือ production)
NODE_ENV=development

# พอร์ตของ Express
PORT=3001

# URL ของ Frontend ที่อนุญาตให้เรียกผ่าน CORS สำหรับโหมด dev
CORS_ORIGIN=http://localhost:5173

# path ของไฟล์ฐานข้อมูล SQLite
DB_FILE=./data/campus.db

# path ของไฟล์ Frontend ที่ Build แล้ว สำหรับใช้ในโหมด production
STATIC_DIR=../frontend/dist
```

### 2) ฝั่ง frontend `frontend/.env`
```env
# สำหรับโหมด development
VITE_API_BASE_URL=http://localhost:3001

# สำหรับโหมด production
VITE_API_BASE_URL=
```

## 6.การตัดสินใจออกแบบ
| หัวข้อ | การเลือกใช้ | เหตุผล |
|---|---|---|
| **โครงสร้างโค้ดหลังบ้าน** | แยก `routes` · `controllers` · `services` ออกจาก frontend | แบ่งหน้าที่ชัดเจน แก้ไขหรือเปลี่ยนฐานข้อมูลได้โดยไม่กระทบ Route |
| **การจัดการ Environment** | รวมไว้ที่ `api/src/config.js` | ไม่ต้อง Hardcode ค่าพอร์ตหรือ path ไฟล์ เปลี่ยนค่าผ่าน `.env` ได้จากจุดเดียว |
| **การรันในโหมด Production** | Express `frontend/dist` พอร์ตเดียวกับ `/api` | Deploy ขึ้น Cloud ได้ง่าย ไม่ติด CORS |
| **การตรวจสอบสถานะระบบ** | มี `GET /api/health` เช็กทั้ง Server และ DB | ให้ระบบ Cloud ใช้ทำ Health Check อัตโนมัติได้ |
| **การจัดการ Error & Log** | ใช้ `errorHandler` + `morgan` แยกตามโหมด | ตอน `dev` อ่าน Log ง่าย  ส่วนตอน `production` ได้ Log ตามมาตรฐาน |
| **ฐานข้อมูล** | ใช้ SQLite `campus.db` | ข้อมูลมีโครงสร้างแน่นอนและจัดเก็บเป็นไฟล์เดียว |