import View from "../core/View.js";
import TaskView from "./TaskView.js";

export default class BoardView extends View {
  initialize() {
    const { groupId, groupTask } = this.props;

    this.$target.id = groupId;
    this.$target.className = "group droppable";

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
    new TaskView(this.model, this.$target, task);
  }

  setEvent() {
    this.addEvent("click", ".btn-add", () => {
      console.log("그룹 추가");
    });

    this.addEvent("click", ".btn-delete", () => {
      console.log("그룹 삭제");
    });
  }
}
