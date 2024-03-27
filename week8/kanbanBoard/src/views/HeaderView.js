import View from "../core/View.js";

export default class HeaderView extends View {
  initialize(parent) {
    this.$target.id = "header";

    this.$target.innerHTML = this.template();
    this.documentFrag.appendChild(this.$target);
    parent.appendChild(this.documentFrag);
  }

  template() {
    return `
            <h1>TODO 서비스</h1>
            <button type="button" class="btn-menu">menu</button>
        `;
  }
}
