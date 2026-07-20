# ENGSE203 LAB 03 — RESPONSIVE-UI

## ผู้จัดทำ

- ชื่อ-นามสกุล: นาย มงคล อาษากิจ
- รหัสนักศึกษา: 68543210039-2
- ระบบปฏิบัติการที่ใช้: Windows-WSL

## วัตถุประสงค์ของงาน

- เพื่อเข้าใจการทำงานของ Responsive Layout, Event เเละ Form
- สามารถเลือกใช้ Semantic HTML, Flexbox/Grid เเละ Breakpoint ได้ถูกต้อง
- เพื่อออกเเบบเว็บให้มี validation เเละ feedback ให้เว็บมีคุณภาพ
- เพื่อให้เข้าใจหลักการทำ UI เเบบ Mobile-First

## เครื่องมือที่ใช้

- VS Code
- WSL Ubuntu 24.04
- NPM
- Vite
- Claude (ใช้เเก้เกิดปัญหา error หาไฟล์ main.js ไม่เจอ)
- ดูตัวอย่างการทำงานเเละวิธีการใช้งานของ CSS property [w3schools](https://www.w3schools.com/cssref/playdemo.php?filename=playcss_font).

## วิธีติดตั้งและรัน

```bash
git clone git@github.com:Mongkol88/engse203-lab03-68543210039-2.git
npm install
npm run dev
```

## โครงสร้างไฟล์

```text
.
├── lab3
|    ├── docs
|    ├── public
|    ├── src
|    |    ├── assets
|    |    ├── main.js
|    |    └── style.css
|    ├── .gitignore
|    ├── index.html
|    ├── INSTRUCTOR_GRADING_CHECKLIST.md
|    ├── package-lock.json
|    ├── package.json
|    ├── README.md
|    └── vite.config.js
├── pre-lab3
|    ├── Starter
|    |    ├── app.js
|    |    ├── index.html
|    |    └── style.css
|    ├── INSTRUCTOR_STEP_SCRIPT.md
|    └── README.md
└── README.md
```
## หลักฐานผลลัพธ์

อธิบายผลลัพธ์ พร้อมแนบภาพหน้าจอหรือข้อความผลลัพธ์ตามที่ใบงานกำหนด
> # ไม่มี Error ✅
> <img width="698" height="167" alt="image" src="https://github.com/user-attachments/assets/1496f2ca-0215-46f2-89e5-e664f1adf36b" />

> # ทดสอบกับ IPHONE SE ✅
> <img width="952" height="872" alt="image" src="https://github.com/user-attachments/assets/7c389a2a-d06a-4bde-9909-f7cbb7926b26" />

> # ทดสอบกับ Surface Duo ✅
> <img width="938" height="828" alt="image" src="https://github.com/user-attachments/assets/69ecd5f9-96e0-4684-9afc-04ddd9dab52c" />

> # ทดสอบกับ IPAD AIR ✅
> <img width="908" height="850" alt="image" src="https://github.com/user-attachments/assets/d3a344b2-dd4c-4d27-aa20-7537fbd2e7e6" />

> # หน้าเว็บปกติ 
> <img width="1908" height="961" alt="image" src="https://github.com/user-attachments/assets/4a2a03f2-787e-4389-863e-3010dd878d35" />


## ปัญหาที่พบและวิธีแก้ไข

ปัญหาที่ 1 : ERR_ABORTED 404 เว็บหาไฟล์ที่ path /src/main.js แต่ไม่เจอ
> <img width="661" height="100" alt="image" src="https://github.com/user-attachments/assets/7866f3e9-15e4-45ab-b019-8cfc4f374035" />
วิธีแก้: ให้ลอง `npm run build` ใหม่
> <img width="826" height="241" alt="image" src="https://github.com/user-attachments/assets/0550d3b1-9007-4894-b765-89a04f28eb64" />
พบว่า Vite จะไม่ยอม bundle ไฟล์ JS ให้ ถ้า <script> tag ไม่มี `attribute type="module"` เมื่อพบวิธีการเเก้ไขเเล้วจากนั้นให้ไปที่ index.html เเล้วหาบรรทัด `<script src="./src/main.js"></script>` เเล้วเเก้ใหม่ให้เป็น `<script type="module" src="./src/main.js"></script>`

## References & AI Assistance

- Source / Documentation: `ENGSE203_Week03_เอกสารประกอบการสอน_ฉบับขยาย_v2.pdf`
- AI tool used: [Cluade](https://claude.ai/new).
- Used for: ใช้เเก้เกิดปัญหา error หาไฟล์ main.js ไม่เจอ เเละ ใช้ทบทวนการใช้ html เเละ css
- My adaptation: รู้กับหลักการ Mobile-First รวมถึงการออกเเบบ UI เเบบ Responsive Web UI 
