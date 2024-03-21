import Model from "../core/Model.js";

export default class BoardModel extends Model {
  constructor() {
    super();
  }

  getBoardData() {
    return this.state.board;
  }
}
