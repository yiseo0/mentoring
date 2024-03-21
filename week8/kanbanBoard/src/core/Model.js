import Observable from "./observable.js";
import initialData from "../utils/initialData.js";

export default class Model extends Observable {
  state;

  constructor() {
    super();

    this.state = this.initialState();
  }

  initialState() {
    const data = localStorage.getItem("data");
    if (data) return JSON.parse(data);

    localStorage.setItem("data", JSON.stringify(initialData));
    return initialData;
  }

  setState(state) {
    this.state = state;
    saveState();
  }

  saveState() {
    localStorage.setItem("data", JSON.stringify(this.state));
  }
}
