export default function sectionPage1() {
  const data = sessionStorage.getItem("data")
    ? JSON.parse(sessionStorage.getItem("data"))
    : {};

  return `
<header>
  <div class="bgPurple"></div>
  <h1>Survey</h1>
  <strong class="require">* 표시는 필수 질문임</strong>
</header>

<form name="form" id="form1" method="post">
   <div class="box">
     <fieldset>
        <legend>radio input<span class="require">*</span></legend>
        <div class="fieldBox"><label><input type="radio" name="radio" value="radio1" 
        ${data.radio === "radio1" ? "checked" : ""}>radio option1</label></div>
        <div class="fieldBox"><label><input type="radio" name="radio" value="radio2" 
        ${data.radio === "radio2" ? "checked" : ""}>radio option2</label></div>
        <div class="fieldBox"><label><input type="radio" name="radio" value="radio3" 
        ${data.radio === "radio3" ? "checked" : ""}>radio option3</label></div>
     </fieldset> 
     <small>※ 필수 항목입니다.</small>
   </div>
  
   <div class="box">
      <fieldset>
         <legend>checkbox input<span class="require">*</span></legend>
         <div class="fieldBox"><label><input type="checkbox" name="checkbox" value="checkbox1"
          ${data.checkbox[0] ? "checked" : ""}>checkbox option1</label></div>
         <div class="fieldBox"><label><input type="checkbox" name="checkbox" value="checkbox2"
          ${data.checkbox[1] ? "checked" : ""}>checkbox option2</label></div>
         <div class="fieldBox"><label><input type="checkbox" name="checkbox" value="checkbox3"
          ${data.checkbox[2] ? "checked" : ""}>checkbox option3</label></div>
      </fieldset>
      <small>※ 필수 항목입니다.</small>
   </div>

   <div class="buttons">
      <button type="button" id="validationBtn" class="next" data-navigate="#/2">다음</button>
      <button type="reset" class="reset">양식지우기</button>
   </div>
</form>
`;
}
