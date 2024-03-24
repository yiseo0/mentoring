import View from "../core/View.js";
import TaskView from "./TaskView.js";

export default class BoardView extends View {
  initialize() {
    const { groupId, groupTask } = this.props;

    this.$target.id = groupId;
    this.$target.className = "group";
    this.viewModel.registerGroupContainer(this.$target);

    groupTask.forEach((task) => this.createTaskView(task));
  }

  template() {
    const { groupTitle } = this.props;

    return `
      <div class="group-header">
        <h2>${groupTitle}</h2>
        <button type="button" class="btn-add">추가</button>
        <button type="button" class="btn-delete">삭제</button>
      </div>
    `;
  }

  createTaskView(task) {
    new TaskView(this.viewModel, this.$target, task);
  }
}
