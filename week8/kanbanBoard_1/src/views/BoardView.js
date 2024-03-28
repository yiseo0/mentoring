import View from "../core/View.js";
import GroupView from "./GroupView.js";

export default class BoardView extends View {
  initialize() {
    this.$target.id = "board";

    const groupList = this.viewModel.getBoardData();

    groupList.forEach((group) => this.createGroupView(group));
  }

  createGroupView(group) {
    new GroupView(this.viewModel, this.$target, group);
  }
}