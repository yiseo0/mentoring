import View from "../core/View.js";

export default class HeaderView extends View {
  initialize() {
    this.$target.id = "header";
  }

  template() {
    return `
      <h1>To Do List</h1>
      <button type="button" class="btn-menu">menu</button>
    `;
  }

  setEvent() {
    this.addEvent("click", "button", () => {
      console.log("메뉴 열림");
    });
  }
}
