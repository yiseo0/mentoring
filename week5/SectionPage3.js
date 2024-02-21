export default function SectionPage3({ target }) {
  const page = document.createElement("div");
  page.className = "SectionPage3";
  page.innerHTML = `
  <h1>섹션 페이지3</h1>
  `;

  this.render = () => {
    target.appendChild(page);
  };
}
