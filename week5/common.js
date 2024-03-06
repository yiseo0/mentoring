// form data 전역변수
export const FORM_DATA = sessionStorage.getItem("data")
  ? JSON.parse(sessionStorage.getItem("data"))
  : { radio: "", checkbox: [], select: "", textarea: "" };

// 입력필드 수정 시 세션스토리지에 저장
document.addEventListener("input", (event) => {
  const { name, value } = event.target;

  if (name === "checkbox") {
    FORM_DATA[name] = Array.from(form.checkbox).map((i) => i.checked);
  } else {
    FORM_DATA[name] = value;
  }

  sessionStorage.setItem("data", JSON.stringify(FORM_DATA));
});

/** 유효성 검사 함수*/
export function validation() {
  const form = document.form;
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => box.classList.remove("empty"));

  if (form.matches("#form1")) {
    if (!FORM_DATA.radio) {
      boxes[0].classList.add("empty");
      return false;
    }
    if (!FORM_DATA.checkbox.includes(true)) {
      boxes[1].classList.add("empty");
      return false;
    }
  } else {
    if (!FORM_DATA.select) {
      boxes[0].classList.add("empty");
      return false;
    }
    if (!FORM_DATA.textarea) {
      boxes[1].classList.add("empty");
      return false;
    }
  }

  return true;
}
