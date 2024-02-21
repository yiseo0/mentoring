export default function SectionPage1({ target }) {
  const page = document.createElement("div");
  page.className = "SectionPage1";
  page.innerHTML = `
  <h1>섹션 페이지1</h1>
  `;

  this.render = () => {
    target.appendChild(page);
  };
}
