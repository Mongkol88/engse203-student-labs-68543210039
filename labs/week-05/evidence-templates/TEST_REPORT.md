# ENGSE203 LAB05 — Student Test Report

**ชื่อ–รหัส:** นาย มงคล อาษากิจ  
**OS / Browser / Node:** Ubuntu 24.04 WSL / microsoft edge / node v22.23.2

**Branch / Commit:** `lab/week-05` / [Commit 86998d3](https://github.com/Mongkol88/engse203-student-labs-68543210039/commit/86998d3fcbf2c2a40e1a7f9082e82767e69d4be7)

กรอก Actual result จากการรันจริง ใช้ `PASS`, `FAIL` หรือ `NOT RUN` และอ้างหลักฐานแบบ relative path

| Test ID | Preconditions / procedure summary | Actual result | Status | Evidence / Notes |
|---|---|---|---|---|
| TC-L5-01 | เปิด `#/` | หน้า Dashboard โหลดสำเร็จ แสดงสถานะกำลังโหลดชั่วครู่ แล้วแสดงรายการคำร้องทั้งหมดตามปกติ | PASS | <img width="1772" height="957" alt="image" src="https://github.com/user-attachments/assets/8dd4995f-e242-4e74-a035-20d9f4501492" /> |
| TC-L5-02 | ใช้ navigation 3 รายการ | เมนูทั้ง 3 รายการ (Dashboard / New Request / About) สามารถคลิกสลับหน้าได้ถูกต้อง และมีแถบเน้นบอกตำแหน่งหน้าปัจจุบัน | PASS | **Dashboard** <img width="1103" height="832" alt="image" src="https://github.com/user-attachments/assets/ef59c1e9-fda7-427c-a4b5-624735d8ba4e" /> **New Request** <img width="1148" height="843" alt="image" src="https://github.com/user-attachments/assets/8988739e-4290-4071-8f64-14e7f396d5c5" /> **About** <img width="1087" height="477" alt="image" src="https://github.com/user-attachments/assets/ce8b4b88-d0ab-4910-85a9-16295d61a446" /> |
| TC-L5-03 | เปิด/refresh `#/requests/new` | หน้าแบบฟอร์มสร้างคำร้องใหม่เปิดใช้งานได้ปกติ และเมื่อกดรีเฟรชหน้าเว็บก็ยังคงอยู่ที่หน้านี้ได้ ไม่หลุดไปหน้าอื่น | PASS | <img width="1096" height="860" alt="image" src="https://github.com/user-attachments/assets/25d87784-9002-4dd8-96a9-1340042287df" /> |
| TC-L5-04 | เปิด `#/requests/REQ-001` | แสดงหน้ารายละเอียดคำร้องรหัส REQ-001 ครบถ้วนทุกข้อมูล (ชื่อผู้แจ้ง, ประเภท, สถานที่, รายละเอียด, ความเร่งด่วน, สถานะ) | PASS | <img width="1137" height="580" alt="image" src="https://github.com/user-attachments/assets/a8134918-6ffe-4eb4-bacd-f13f1e67e1c2" /> |
| TC-L5-05 | เปิด `#/requests/REQ-999` | แสดงข้อความแจ้งเตือน "ไม่พบคำร้องรหัส REQ-999" ชัดเจน พร้อมมีปุ่มให้กดกลับไปยังหน้าหลัก | PASS | <img width="1158" height="452" alt="image" src="https://github.com/user-attachments/assets/66c5f56c-6ed2-4c97-9aff-e8603261440b" /> |
| TC-L5-06 | เปิด `#/unknown` | แสดงหน้าแจ้งเตือน 404 ไม่พบหน้าที่ต้องการ พร้อมมีปุ่มกดกลับไปยังหน้า Dashboard | PASS | <img width="1082" height="337" alt="image" src="https://github.com/user-attachments/assets/a6d85be0-153b-4c8f-9aa6-24455513cee0" /> |
| TC-L5-07 | ลบ LAB05 key แล้วเปิด Dashboard | เมื่อล้างข้อมูลที่บันทึกไว้ในเบราว์เซอร์แล้วโหลดหน้าเว็บใหม่ ระบบจะดึงข้อมูลตัวอย่างเริ่มต้นกลับมาแสดงผลให้อัตโนมัติ | PASS | <img width="805" height="827" alt="image" src="https://github.com/user-attachments/assets/c74bd60e-91e5-479d-880a-095e1f944359" /> <img width="1915" height="848" alt="image" src="https://github.com/user-attachments/assets/a5e39c1f-f2d0-4aed-94ef-ce595a162d08" /> |
| TC-L5-08 | สังเกตช่วง latency | มีหน้าจอกำลังโหลด (Loading) ปรากฏขึ้นมาชั่วขณะหนึ่ง ก่อนจะแสดงรายการข้อมูลทั้งหมด | PASS | <img width="1097" height="353" alt="image" src="https://github.com/user-attachments/assets/f14f6bc1-9bc5-4ed3-b2b5-81ca109f8905" /> |
| TC-L5-09 | เปิด `#/?scenario=error` | แสดงกล่องข้อความแจ้งเตือนข้อผิดพลาด "โหลดข้อมูลไม่สำเร็จ" พร้อมปุ่มสำหรับกดลองใหม่อีกครั้ง | PASS | <img width="1143" height="527" alt="image" src="https://github.com/user-attachments/assets/977f22d5-434c-41e8-98b7-f8f999066edb" /> s|
| TC-L5-10 | กด Retry | เมื่อกดปุ่มลองอีกครั้ง ระบบจะกลับมาโหลดและแสดงผลรายการคำร้องตามปกติได้สำเร็จ | PASS | <img width="1086" height="832" alt="image" src="https://github.com/user-attachments/assets/037bda1c-a054-4e9e-b76b-3f6349f67688" /> |
| TC-L5-11 | เปิด `#/?scenario=empty` | แสดงหน้าจอว่างเปล่าพร้อมข้อความ "ยังไม่มีคำร้อง" อย่างถูกต้อง และมีปุ่มให้กดสร้างคำร้องใหม่ | PASS | <img width="1050" height="495" alt="image" src="https://github.com/user-attachments/assets/033edafb-45b7-475b-8a53-0c361cf8705e" /> |
| TC-L5-12 | รัน public checker | ใช้คำสั่ง npm run check ในการตรวจสอบว่าผ่านทั้ง 133/133 หรือไม่ | PASS | command summary `npm run check` <img width="977" height="272" alt="image" src="https://github.com/user-attachments/assets/41f9ff65-2edc-4c4e-9129-c1ac171f2a92" /> |
| TC-L5-13 | submit form ผิด validation | เมื่อกดส่งฟอร์มโดยไม่กรอกข้อมูล ระบบจะแสดงข้อความเตือนสีแดงใต้ทุกช่องที่จำเป็น และไม่ยอมให้บันทึกข้อมูล | PASS | <img width="1122" height="870" alt="image" src="https://github.com/user-attachments/assets/fa93d79f-2b42-48da-9851-ab977c3a8da8" /> |
| TC-L5-14 | เพิ่ม valid request แล้ว refresh | กรอกข้อมูลครบถ้วนแล้วบันทึกสำเร็จ ระบบพาไปหน้ารายละเอียด และเมื่อกดรีเฟรชข้อมูลที่เพิ่งสร้างก็ยังคงอยู่ไม่หายไป | PASS | <img width="1123" height="607" alt="image" src="https://github.com/user-attachments/assets/f0111faa-8b68-417e-93f2-280f061c95a3" /> |
| TC-L5-15 | ทดสอบ filters ทุกค่า | ปุ่มตัวกรองสถานะทั้ง 4 แบบ (ทั้งหมด, รอดำเนินการ, กำลังดำเนินการ, เสร็จสิ้น) สามารถคัดกรองรายการแสดงผลได้ตรงตามสถานะจริง | PASS | **ทั้งหมด** <img width="803" height="758" alt="image" src="https://github.com/user-attachments/assets/7469f31c-4de6-4494-81c0-e157a2b5baa8" /> **รอดำเนินการ** <img width="823" height="537" alt="image" src="https://github.com/user-attachments/assets/a2acafc1-c3aa-4fea-9600-5855a1a7748c" /> **กำลังดำเนินการ** <img width="808" height="441" alt="image" src="https://github.com/user-attachments/assets/52022358-7b5d-4a4d-b1ad-c71fc69abce1" /> **เสร็จสิ้น** <img width="825" height="422" alt="image" src="https://github.com/user-attachments/assets/d438fed6-70c7-4bf2-b625-d6ab63e6c2c8" /> |
| TC-L5-16 | ลบ request แล้ว refresh | กดลบคำร้องสำเร็จ มีข้อความแจ้งเตือนการลบ และเมื่อกดรีเฟรชหน้าเว็บ รายการที่ถูกลบก็หายไปจริง | PASS | <img width="868" height="721" alt="image" src="https://github.com/user-attachments/assets/ae7998c3-05e4-47fa-bac6-e0e3e7f9291e" /> **เมื่อ Refresh** <img width="835" height="677" alt="image" src="https://github.com/user-attachments/assets/7db10043-30da-4560-92b0-f4fd53ae54e8" /> |
| TC-L5-17 | Reset Demo Data | กดปุ่มรีเซ็ตข้อมูลแล้วยืนยัน ระบบจะล้างข้อมูลที่เพิ่มไว้ทั้งหมดและคืนค่ากลับเป็นชุดข้อมูลตัวอย่างเริ่มต้น | PASS | <img width="808" height="676" alt="image" src="https://github.com/user-attachments/assets/d19b0cdc-3621-4c38-9749-067b49fe6469" /> |
| TC-L5-18 | malformed + wrong schema แล้ว reload | เมื่อข้อมูลที่บันทึกไว้เสียหายหรือไม่ตรงรูปแบบ ระบบจะตรวจจับได้และกู้คืนข้อมูลตัวอย่างเริ่มต้นให้อัตโนมัติ พร้อมแสดงข้อความแจ้งเตือน | PASS | <img width="1262" height="440" alt="image" src="https://github.com/user-attachments/assets/4af3ba03-24e0-4441-ac39-e7946df1f51b" /> |
| TC-L5-19 | เทียบ summary กับ data | ตัวเลขสรุปยอดในแต่ละการ์ด (ทั้งหมด, รอดำเนินการ, กำลังดำเนินการ, เสร็จสิ้น) นับได้ตรงกับจำนวนรายการคำร้องที่มีอยู่จริง | PASS | <img width="1765" height="795" alt="image" src="https://github.com/user-attachments/assets/72280722-ebf5-46ee-b91d-10899fc0395c" /> |
| TC-L5-20 | viewport 375px ทุก page | ใช้กับ 375px ได้ทุก page | PASS | <img width="742" height="880" alt="image" src="https://github.com/user-attachments/assets/113c8d98-ee2d-48df-815d-a31a0ea693b9" /> |
| TC-L5-21 | keyboard only | สามารถใช้ keyboard mode เท่านั้นได้โดยการกด Tab | PASS | <img width="1331" height="798" alt="image" src="https://github.com/user-attachments/assets/218a897a-6b8a-4b10-a32e-2eea4de45b91" /> |
| TC-L5-22 | checker/build/preview | NOT RUN | NOT RUN | command summary |
| TC-L5-23 | Pages Incognito + hash refresh | NOT RUN | NOT RUN | `images/pages-incognito.png` + URL |
| TC-L5-24 | merged PR + tag | NOT RUN | NOT RUN | PR URL + commit/tag |

## Rerun log

เก็บร่องรอย FAIL เดิม แล้วเพิ่มบรรทัด rerun แทนการลบประวัติ

| Test ID | เวลา | Fix | Actual result | Status |
|---|---|---|---|---|
| -- | -- | ไม่มี fix | -- | -- |
