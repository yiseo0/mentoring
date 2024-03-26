import Observable from "./Observable.js";

export default class ViewModel extends Observable {
  constructor(model) {
    super();
    this.model = model;
  }

  
}
