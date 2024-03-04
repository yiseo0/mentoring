// 유효성 검사
export function validation() {
  const form = document.form;
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => box.classList.remove("empty"));

  const data = sessionStorage.getItem("data")
    ? JSON.parse(sessionStorage.getItem("data"))
    : {};

  if (form.matches("#form1")) {
    if (!form.radio.value) {
      boxes[0].classList.add("empty");
      return false;
    }
    if (form.querySelectorAll("input[type='checkbox']:checked").length === 0) {
      boxes[1].classList.add("empty");
      return false;
    }

    data.radio = form.radio.value;
    data.checkbox = Array.from(form.checkbox).map((i) => i.checked);
  } else {
    if (!form.select.value) {
      boxes[0].classList.add("empty");
      return false;
    }
    if (!form.textarea.value) {
      boxes[1].classList.add("empty");
      return false;
    }

    data.select = form.select.value;
    data.textarea = form.textarea.value;
  }

  sessionStorage.setItem("data", JSON.stringify(data));
  return true;
}
