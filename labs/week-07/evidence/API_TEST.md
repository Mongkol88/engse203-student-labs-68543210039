# รายงานผลการทดสอบ API (API_TEST) — LAB 07

**ชื่อ–รหัส:** นาย มงคล อาษากิจ — 68543210039-2
**วันที่ทดสอบ:** 14 กันยายน 2569
**เครื่องมือทดสอบ:** Node.js Test Runner (`node:test`), Supertest (`supertest`), Node.js `v24.18.0`

---

## 1. ผลการทดสอบ Automated Tests (`api/tests/api.test.js`)

ผลการรันคำสั่ง `npm test` เพื่อตรวจสอบ Endpoint หลัก 6 เคสตามข้อกำหนด CP16:

| # | ชุดทดสอบ (Describe)                    | กรณีทดสอบ (Test Case)                                    | Method & Path               | Input / Payload                              | Status คาดหวัง | Status ที่ได้จริง | ผลลัพธ์ |
| - | ---------------------------------------------- | ----------------------------------------------------------------- | --------------------------- | -------------------------------------------- | :-------------------: | :-------------------------: | :------------: |
| 1 | `GET /api/requests`                            | คืนรายการทั้งหมด พร้อม status 200            | `GET /api/requests`         | —                                           |         `200`         |            `200`            |  ✅ ผ่าน  |
| 2 | `GET /api/requests/:id พบ`                   | คืนรายการเฉพาะ REQ-001 status 200                   | `GET /api/requests/REQ-001` | —                                           |         `200`         |            `200`            |  ✅ ผ่าน  |
| 3 | `GET /api/requests/:id ไม่พบ`             | ไม่พบรายการเฉพาะ REQ-999 status 404               | `GET /api/requests/REQ-999` | —                                           |         `404`         |            `404`            |  ✅ ผ่าน  |
| 4 | `POST ข้อมูลถูกต้อง`              | สร้างรายการสำเร็จ และ status เป็น pending | `POST /api/requests`        | ข้อมูลครบถ้วน (validRequest)    |         `201`         |            `201`            |  ✅ ผ่าน  |
| 5 | `POST ข้อมูลไม่ครบ`                | สร้างรายการไม่สำเร็จ ข้อมูลไม่ครบ | `POST /api/requests`        | ข้อมูลไม่ครบ (`requestType: ''`) |         `400`         |            `400`            |  ✅ ผ่าน  |
| 6 | `CORS header ตอบ origin ที่อนุญาต` | header ตรงกับ origin ที่อนุญาต                     | `GET /api/requests`         | Header:`Origin: http://localhost:5173`       |    `200` + Header    |       `200` + Header       |  ✅ ผ่าน  |

---

## 2. ผลการทดสอบ Endpoints อื่น ๆ เพิ่มเติม (PUT / DELETE / Error Handling)

| #  | ฟังก์ชันการทำงาน                                | Method & Path                  | Payload / Parameter           | ผลตอบกลับ (Response Body / Header)                                       | Status คาดหวัง | Status ที่ได้จริง | ผลลัพธ์ |
| -- | --------------------------------------------------------------- | ------------------------------ | ----------------------------- | --------------------------------------------------------------------------------- | :-------------------: | :-------------------------: | :------------: |
| 7  | อัปเดตสถานะคำร้องสำเร็จ (CP13)           | `PUT /api/requests/REQ-001`    | `{"status": "in-progress"}`   | ได้ object คำร้องที่มี`status: "in-progress"`                       |         `200`         |            `200`            |  ✅ ผ่าน  |
| 8  | อัปเดตสถานะด้วยค่าที่ไม่ถูกต้อง  | `PUT /api/requests/REQ-001`    | `{"status": "wrong"}`         | `{"error": "สถานะต้องเป็น pending, in-progress หรือ completed"}` |         `400`         |            `400`            |  ✅ ผ่าน  |
| 9  | อัปเดตสถานะคำร้องที่ไม่พบ              | `PUT /api/requests/REQ-999`    | `{"status": "in-progress"}`   | `{"error": "ไม่พบคำร้องรหัส REQ-999"}`                             |         `404`         |            `404`            |  ✅ ผ่าน  |
| 10 | ลบคำร้องสำเร็จ                                    | `DELETE /api/requests/:id`     | ID ที่มีอยู่จริง | ไม่มี Body ส่งกลับ (204 No Content)                                   |         `204`         |            `204`            |  ✅ ผ่าน  |
| 11 | ลบคำร้องที่ไม่พบ                                | `DELETE /api/requests/REQ-999` | `REQ-999`                     | `{"error": "ไม่พบคำร้องรหัส REQ-999"}`                             |         `404`         |            `404`            |  ✅ ผ่าน  |
| 12 | เรียกเส้นทางที่ไม่มีในระบบ (notFound) | `GET /api/unknown-route`       | —                            | `{"error": "ไม่พบเส้นทาง GET /api/unknown-route"}`                    |         `404`         |            `404`            |  ✅ ผ่าน  |

---

## 3. Terminal Log จากการรัน `npm test`

```text
> engse203-week06-campus-api@2.0.0 test
> node --test "tests/*.test.js"

GET /api/requests 200 1.638 ms - 1030
▶ GET /api/requests
  ✔ คืนรายการทั้งหมด พร้อม status 200 (12.703738ms)
✔ GET /api/requests (19.240487ms)
GET /api/requests/REQ-001 200 0.380 ms - 321
▶ GET /api/requests/:id พบ
  ✔ คืนรายการเฉพาะ REQ-001 status 200 (3.475648ms)
✔ GET /api/requests/:id พบ (3.652453ms)
GET /api/requests/REQ-999 404 0.549 ms - 431
▶ GET /api/requests/:id ไม่พบ
  ✔ ไม่พบรายการเฉพาะ REQ-999 status 404 (5.795709ms)
✔ GET /api/requests/:id ไม่พบ (6.050417ms)
POST /api/requests/ 201 4.427 ms - 258
▶ POST ข้อมูลถูกต้อง
  ✔ สร้างรายการสำเร็จ และ status เป็น pending (6.809401ms)
✔ POST ข้อมูลถูกต้อง (7.011934ms)
POST /api/requests/ 400 0.481 ms - 613
▶ POST ข้อมูลไม่ครบ
  ✔ สร้างรายการไม่สำเร็จ ข้อมูลไม่ครบ (3.138293ms)
✔ POST ข้อมูลไม่ครบ (3.495563ms)
GET /api/requests 200 0.379 ms - 1289
▶       CORS header ตอบ origin ที่อนุญาต
  ✔ header ตรง (2.368853ms)
✔       CORS header ตอบ origin ที่อนุญาต (2.573838ms)

ℹ tests 6
ℹ suites 6
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 173.77153
```

---

## 4. สรุปผลการทดสอบ

- **Automated Tests (`api.test.js`):** ผ่าน **6 / 6** เคส (100%)
- **Checker ทั้งระบบ (`check-week07.mjs`):** ผ่าน **36 / 36** รายการ (In-Class 25/25, Take-Home 8/8, Challenge 3/3)
