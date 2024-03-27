export default class Controller {
  constructor(model) {
    this.model = model;
  }

  destroy() {
    this.model.unsubscribe();
  }
}
