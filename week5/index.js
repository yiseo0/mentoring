import { FORM_DATA, validation } from "./common.js";
import createRouter from "./router.js";
import sectionPage1 from "./sectionPage1.js";
import sectionPage2 from "./sectionPage2.js";
import sectionPage3 from "./sectionPage3.js";

const container = document.querySelector("main");
const pages = {
  sectionPage1: () => (container.innerHTML = sectionPage1()),
  sectionPage2: () => (container.innerHTML = sectionPage2()),
  sectionPage3: () => (container.innerHTML = sectionPage3()),
};

window.addEventListener("click", (event) => {
  // 양식 지우기
  if (event.target.matches("#resetBtn")) {
    if (form.matches("#form1")) {
      FORM_DATA.radio = "";
      FORM_DATA.checkbox = [];
    } else {
      FORM_DATA.select = "";
      FORM_DATA.textarea = "";
    }
    form.reset();

    sessionStorage.setItem("data", JSON.stringify(FORM_DATA));
    return;
  }

  // 유효성 검사
  if (event.target.matches("#validationBtn")) {
    event.preventDefault();
    if (!validation()) return;
  }

  if (event.target.matches("[data-navigate]")) {
    router.navigate(event.target.dataset.navigate);
  }
});

const router = createRouter();
router
  .addRouter("#/", pages.sectionPage1)
  .addRouter("#/2", pages.sectionPage2)
  .addRouter("#/3", pages.sectionPage3)
  .start();
