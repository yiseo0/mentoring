export default function SectionPage2({ target }) {
  const page = document.createElement("div");
  page.className = "SectionPage2";
  page.innerHTML = `
  <h1>섹션 페이지2</h1>
  `;

  this.render = () => {
    target.appendChild(page);
  };
}
