# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: นาย มงคล อาษากิจ
- รหัสนักศึกษา: 68543210039-2
- Section: 01

## URLs

- Repository: [engse203-student-labs-68543210039](https://github.com/Mongkol88/engse203-student-labs-68543210039/tree/main)
- Pull Request: TODO
- GitHub Pages: TODO

## Component Tree

```text
App
├── AppHeader
├── SummaryPanel
├── RequestForm
├── FilterBar
└── RequestList
    └── RequestCard
```

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

- App เป็น owner ของ state หลัก เช่น  requests, statusFilter และ formData เพื่อให้ UI เป็น State-driven
- RequestForm รับ formData และ onFormChange เป็น prop จาก App เพื่อควบคุม input ทั้งหมดแบบ controlled
- RequestForm ส่ง callback onAddRequest ไปยัง App เมื่อ submit ข้อมูลถูกต้อง
- FilterBar รับ value และ onFilterChange จาก App เพื่อให้เลือกกรองสถานะได้
- RequestList รับ filtered requests จาก App และส่ง onDeleteRequest กลับไปยัง App เพื่อลบรายการ

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | initial requests/summary ถูกต้อง; console ไม่มี error | Pass | [กดเพิ่อดูหลักฐาน](https://github.com/user-attachments/assets/ee3f0db9-c2b2-4987-8015-cea8ee7c228a) |
| TC-02 Controlled input | ทุก field เปลี่ยนตาม state | Pass | [กดเพิ่อดูหลักฐาน](https://github.com/user-attachments/assets/425ae665-5a76-4009-9bd8-4e1f52bbf1da) |
| TC-03 Invalid submit | ไม่เพิ่มคำร้องและแสดง error ใกล้ field | Pass | [กดเพิ่อดูหลักฐาน](https://github.com/user-attachments/assets/333593d3-8b36-4758-95a9-33d27e447030) |
| TC-04 Valid submit | เพิ่ม pending; summary เพิ่ม; reset form | Pass | [Input](https://github.com/user-attachments/assets/c8b7e863-fd7a-4b69-88f7-7c09e777b738),[Result](https://github.com/user-attachments/assets/e2fa413f-b591-4e57-96fe-c72edbd95ab5) |
| TC-05 Filter | แสดงเฉพาะคำร้องตามสถานะที่เลือก | Pass | [ผลลัพธ์ รอดำเนินการ](https://github.com/user-attachments/assets/c614939e-880f-4291-bd2b-4565037d54f1), [ผลลัพธ์ กำลังดำเนินการ](https://github.com/user-attachments/assets/51cf1699-922f-46db-8bdd-613426f4977f), [ผลลัพธ์ เสร็จสิน](https://github.com/user-attachments/assets/e3961ae2-6cc7-44e9-9fc6-710c539123b3) |
| TC-06 All | แสดงทุกคำร้องเมื่อเลือก all | Pass | [กดเพิ่อดูหลักฐาน](https://github.com/user-attachments/assets/1922f00d-587a-4bb3-903b-36df5c741747) |
| TC-07 Empty | แสดงข้อความ empty state เมื่อไม่มีรายการ | Pass | [กดเพิ่อดูหลักฐาน](https://github.com/user-attachments/assets/209363e4-f953-4a15-8586-ec299ba47464) |
| TC-08 Delete | 	ลบถูก id; summary/list เปลี่ยน| Pass | [กดเพิ่อดูหลักฐาน](https://github.com/user-attachments/assets/2dacd7c3-0b00-40cb-81ad-095c617d65aa) |
| TC-09 Mobile | responsive 375px และไม่มี horizontal scroll | Pass | [กดเพิ่อดูหลักฐาน](https://github.com/user-attachments/assets/e2154d30-3cd2-41a0-ba48-f201ec5f9bd6) |
| TC-10 Keyboard | focus/label/error/feedback ใช้งานได้ | Pass | [focus ชื่อผู้เเจ้ง](https://github.com/user-attachments/assets/6e14e21e-d47d-492b-b227-14e5c52eca5b), [focus ประเภทคำร้อง](https://github.com/user-attachments/assets/7e9462fa-fde0-4523-8c2d-2d5a021edf2d), [focus สถานที่](https://github.com/user-attachments/assets/c5137393-752f-4348-ac4c-18e3e2165b98), [focus รายละเอียด](https://github.com/user-attachments/assets/d012742e-bf41-4749-9724-44a3b14e9e43), [focus ความเร่งด่วน](https://github.com/user-attachments/assets/ea8eaa0f-6a53-4d89-b06a-28508143773f), [submit keyboard](https://github.com/user-attachments/assets/af5945f6-44b2-4be7-ba01-bd8dabd915d0), [focus filter](https://github.com/user-attachments/assets/25a905ee-15a1-4ce1-bc39-e70a48a8d7b7) |
| TC-11 Build | npm run build และ preview ผ่าน | Pass | [npm run build](https://github.com/user-attachments/assets/44e61201-a1e6-4dca-b994-0d2f34ec490a), [npm run preview](https://github.com/user-attachments/assets/c07992d5-249f-40cf-83d6-eca654d474f1) |
| TC-12 Pages | หน้า Pages Hub โหลดและ assets ถูกต้อง | Pending | ต้อง deploy แล้วตรวจใน Incognito |

## Screenshots

- Desktop: `evidence/desktop.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation/empty state: TODO

## Week 03 → Week 04 Reflection

ใน Week-03 ใช้ DOM mutation ในการจัดการ UI โดยแก้ element ตรงๆ ส่วน Week 04 ใช้ React state เมื่อ state เปลี่ยน UI จะ rerender ใหม่เอง ทำให้ logic ของคำร้อง, filter และ validation มีข้อมูลที่ตรงกันมากขึ้น และลดปัญหาไม่ตรงกันระหว่าง DOM กับข้อมูล

## AI / External Resource Disclosure

ระบุเครื่องมือหรือแหล่งที่ใช้, prompt/คำถามสำคัญ, ส่วนที่นำมาปรับ และวิธีที่ตรวจสอบความถูกต้อง หากไม่ได้ใช้ให้เขียนว่า “ไม่ได้ใช้”

