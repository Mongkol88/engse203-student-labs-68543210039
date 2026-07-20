# ENGSE203 Learning Dashboard

> LAB 02 — Modern JavaScript, Modules & Async Data

## Student Information

- Student ID: 68543210039-2
- Name: นาย มงคล อาษากิจ
- Operating system: macOS
- GitHub Pages URL: https://github.com/Mongkol88/engse203-lab02-68543210039-2/tree/main#

## Project Overview
- Deploy เว็บไซต์ static ผ่าน GitHub Pages โดยใช้ผลลัพธ์ build ในโฟลเดอร์ docs/
- การใช้ npm scripts สำหรับ development, check, build และ preview ได้

## Installation and Run

```bash
npm install
npm run check
npm run dev
```

## Build and Preview

```bash
npm run build
npm run preview
```

## Test Evidence

- Normal state screenshot: `<add image path or markdown image>`
<img width="1630" height="947" alt="image" src="https://github.com/user-attachments/assets/4639eaa6-b164-404b-9a01-896075a91754" />

- Error state screenshot (`?simulateError=1`): 
<img width="1420" height="558" alt="Image" src="https://github.com/user-attachments/assets/354ae6d2-5925-499a-9876-fac70d426982" />

## Problems and Fixes
- ปัญหา 
ในการสร้าง config สำหรับ SSH key สร้าง config ผิดที่ เมื่อใช้คำสั่ง  `more id_ed25519_github_macos.pub` ทำให้เกิด error permission denied
- วิธีการเเก้ไข
ลบไฟล์ config อันที่ error ทิ้งจากนั้นเข้าไปที่โฟลเดอร์ ~/.ssh/ เพื่อสร้าง SSH Key และไฟล์ config ใหม่ให้ถูกต้อง


## References & AI Assistance

- References used: `[<list sources>](https://github.com/se-rmutl/engse203-lab/tree/main/labs/week-02-modern-javascript)`
- AI assistance used: -
