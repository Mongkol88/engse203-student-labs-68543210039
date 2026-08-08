import { useState } from "react";

function validateTask(formData) {
  const errors = {};

  if (formData.requesterName.trim().length < 2) {
    errors.requesterName = 'ชื่อผู้แจ้งต้องมีอย่างน้อย 2 ตัวอักษร';
  }

  if (!formData.requestType) {
    errors.requestType = 'กรุณาเลือกประเภทคำร้อง';
  }

  if (formData.location.trim().length < 1) {
    errors.location = 'กรุณากรอกสถานที่';
  }

  if (formData.details.trim().length < 10) {
    errors.details = 'กรุณาอธิบายรายละเอียดอย่างน้อย 10 ตัวอักษร';
  }

  if (!formData.priority) {
    errors.priority = 'กรุณาเลือกความเร่งด่วน';
  }

  return errors;
}

function RequestForm({ formData, onFormChange, onAddRequest }) {
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('พร้อมรับคำร้องใหม่');

  function handleFieldChange(event) {
    const { name, value } = event.target;
    onFormChange({ ...formData, [name]: value });
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
    setStatusMessage('พร้อมรับคำร้องใหม่');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateTask(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    onAddRequest({
      requesterName: formData.requesterName.trim(),
      requestType: formData.requestType,
      location: formData.location.trim(),
      details: formData.details.trim(),
      priority: formData.priority,
    });
    setStatusMessage('เพิ่มคำร้องสำเร็จ');
  }

  return (
    <section className="panel" aria-labelledby="request-form-title">
      <p className="eyebrow dark">CONTROLLED FORM</p>
      <h2 id="request-form-title">สร้างคำร้องใหม่</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="requesterName">ชื่อผู้แจ้ง</label>
          <input
            id="requesterName"
            name="requesterName"
            value={formData.requesterName}
            onChange={handleFieldChange}
            aria-invalid={Boolean(errors.requesterName)}
          />
          <small className="error" id="requesterName-error">{errors.requesterName || ''}</small>
        </div>

        <div className="field">
          <label htmlFor="requestType">ประเภทคำร้อง</label>
          <select
            id="requestType"
            name="requestType"
            value={formData.requestType}
            onChange={handleFieldChange}
            aria-invalid={Boolean(errors.requestType)}
          >
            <option value="">-- เลือกประเภท --</option>
            <option value="แจ้งซ่อม">แจ้งซ่อม</option>
            <option value="ขอใช้ห้อง">ขอใช้ห้อง</option>
            <option value="บริการบัญชีผู้ใช้">บริการบัญชีผู้ใช้</option>
          </select>
          <small className="error" id="requestType-error">{errors.requestType || ''}</small>
        </div>

        <div className="field">
          <label htmlFor="location">สถานที่</label>
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleFieldChange}
            aria-invalid={Boolean(errors.location)}
          />
          <small className="error" id="location-error">{errors.location || ''}</small>
        </div>

        <div className="field">
          <label htmlFor="details">รายละเอียด</label>
          <textarea
            id="details"
            name="details"
            rows="4"
            value={formData.details}
            onChange={handleFieldChange}
            aria-invalid={Boolean(errors.details)}
          ></textarea>
          <small className="error" id="details-error">{errors.details || ''}</small>
        </div>

        <fieldset className="field">
          <legend>ความเร่งด่วน</legend>
          <label>
            <input
              type="radio"
              name="priority"
              value="normal"
              checked={formData.priority === 'normal'}
              onChange={handleFieldChange}
            />{' '}
            ปกติ
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="urgent"
              checked={formData.priority === 'urgent'}
              onChange={handleFieldChange}
            />{' '}
            เร่งด่วน
          </label>
          <small className="error" id="priority-error">{errors.priority || ''}</small>
        </fieldset>

        <button type="submit">เพิ่มคำร้อง</button>
        <p className="status" role="status">{statusMessage}</p>
      </form>
    </section>
  );
}

export default RequestForm;
