const form = document.querySelector("#request-form");
const formStatus = document.querySelector("#form-status");

const previewFormStatus = document.querySelector("#preview-form-status");
const previewName = document.querySelector("#preview-name");
const previewType = document.querySelector("#preview-type");
const previewDetails = document.querySelector("#preview-details");

const requestList = document.querySelector("#request-list");
const goalCount = document.querySelector("#goal-count");

// TODO 1: query preview/status/list elements
function addRequest(data) {
  const item = document.createElement("li");
  const title = document.createElement("strong");
  const details = document.createElement("span");

  title.textContent = `${data.requesterName} • ${data.requestType} `;
  details.textContent = data.details;

  item.append(title, details);
  requestList.prepend(item);
}

function renderStatus(type, message) {
  formStatus.textContent = message;
  formStatus.dataset.state = type;

  const statusLabel =
    { invalid: "ตรวจสอบข้อมูล", success: "คำขอถูกส่งแล้ว" }[type] ??
    "พร้อมบันทึกคำขอ";
  previewFormStatus.textContent = statusLabel;
  previewFormStatus.dataset.state = type;
}

// TODO 2: readForm()
function readForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

// TODO 3: renderPreview(data)
function renderPreview(data) {
  previewName.textContent = data.requesterName || "ยังไม่ระบุชื่อ";
  previewType.textContent = data.requestType || "ยังไม่เลือกประเภท";
  previewDetails.textContent = data.details || "ยังไม่มีรายละเอียด";
  goalCount.textContent = `${data.details.length} ตัวอักษร`;
}

// TODO 4: validate(data)
function validate(data) {
  const errors = {};

  if (data.requesterName.trim().length < 2) {
    errors.requesterName = "กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร";
  }

  if (!data.requestType) {
    errors.requestType = "กรุณาเลือกประเภทคำขอ";
  }

  if (data.details.trim().length < 10) {
    errors.details = "กรุณาอธิบายอย่างน้อย 10 ตัวอักษร";
  }

  return errors;
}

// TODO 5: renderErrors(errors)
function renderErrors(errors) {
  for (const name of ["requesterName", "requestType", "details"]) {
    const field = document.querySelector(`[name="${name}"]`);
    const output = document.querySelector(`#${name}-error`);
    const message = errors[name] ?? "";
    output.textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
  }
}

// TODO 6: input and submit listeners
function handleSubmit(form) {
  const data = readForm(form);
  const errors = validate(data);
  renderErrors(errors);

  if (Object.keys(errors).length > 0) {
    renderStatus("invalid", "กรุณาตรวจสอบข้อมูลที่ระบุ");
    return;
  }

  addRequest(data);
  renderStatus("success", "บันทึกคำขอเรียบร้อย");
  form.reset();
  renderPreview(readForm(form));
}

form.addEventListener("input", (event) => {
  const data = readForm(event.currentTarget);
  renderPreview(data);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit(event.currentTarget);
});

console.log("LAB 3 starter ready", form);
