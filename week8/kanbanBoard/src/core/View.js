export default class View {
  viewModel;
  $parent;
  props;
  documentFrag;
  $target;

  constructor(viewModel, $parent, props) {
    this.viewModel = viewModel;
    this.viewModel.subscribe(this);

    this.$parent = $parent;
    this.props = props;

    this.documentFrag = document.createDocumentFragment();
    this.$target = document.createElement("div");

    this.render();
    this.initialize();
  }

  initialize() {}

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
