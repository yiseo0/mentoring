export default class View {
  viewModel;
  $parent;
  documentFrag;
  $target;

  constructor(viewModel, $parent) {
    this.viewModel = viewModel;
    this.viewModel.subscribe(this);

    this.$parent = $parent;

    this.documentFrag = document.createDocumentFragment();
    this.$target = document.createElement("div");

    this.initialize();
    this.render();
  }

  initialize() { }

  template() {
    return "";
  }

  destroy() {
    this.viewModel.unsubscribe(this);
    this.$target.remove();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.documentFrag.appendChild(this.$target);
    this.$parent.appendChild(this.documentFrag);
  }
}
