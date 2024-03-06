import { FORM_DATA } from "./common.js";

export default function sectionPage3() {
  return `
   <header>
      <div class="bgPurple"></div>
      <h1>Survey</h1>
      <div class="result">
         응답이 기록되었습니다.<br>
         ${JSON.stringify(FORM_DATA)}
      </div>
      <a class="first" id="newFormBtn" href="">다른 응답 제출</a>
   </header>
   `;
}
