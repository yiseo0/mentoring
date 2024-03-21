export default class View {
  model;
  $parent;
  props;
  documentFrag;
  $target;

  constructor(model, $parent, props) {
    this.model = model;
    this.model.subscribe(this);

    this.$parent = $parent;
    this.props = props;

    this.documentFrag = document.createDocumentFragment();
    this.$target = document.createElement("div");

    this.setEvent();
    this.render();
    this.initialize();
  }

  initialize() {}

  template() {
    return "";
  }

  render() {
    this.$target.innerHTML = this.template();
    this.documentFrag.appendChild(this.$target);
    this.$parent.appendChild(this.documentFrag);
  }

  setEvent() {}

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
}
