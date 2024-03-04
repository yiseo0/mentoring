export default function sectionPage3() {
  const data = sessionStorage.getItem("data");

  return `
   <header>
      <div class="bgPurple"></div>
      <h1>Survey</h1>
      <div class="result">
         응답이 기록되었습니다.<br>
         ${data}
      </div>
      <a class="first" href="#/">다른 응답 제출</a>
   </header>
   `;
}
