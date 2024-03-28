import View from "../core/View.js";
import TaskView from "./TaskView.js";

export default class BoardView extends View {
  constructor(viewModel, $parent, { groupId, groupTask, groupTitle }) {
    super(viewModel, $parent);
    this.groupId = groupId;
    this.groupTask = groupTask;
    this.groupTitle = groupTitle;
  }

  initialize() {
    this.$target.id = this.groupId;
    this.$target.className = "group";
    this.viewModel.registerGroupContainer(this.$target);

    const $groupToggleButton = this.$target.querySelector(
      ".group__button--toggle"
    );
    const $groupBody = this.$target.querySelector(".group__body");
    this.viewModel.registerToggleButton($groupToggleButton, $groupBody);

    const $form = this.$target.querySelector(".group__form");
    this.viewModel.registerSubmitTask($form);

    this.groupTask.forEach((task) => this.createTaskView(task));
  }

  template() {
    return `
      <div class="group__header">
        <h2>${this.groupTitle}</h2>
        <button type="button" class="group__button--toggle">&#43;</button>
        <button type="button" class="group__button--delete">삭제</button>
      </div>

      <div class="group__body">
        <form class="group__form">
          <textarea class="group__task-title" name="taskTitle" placeholder="Enter a note"></textarea>
          작성자 : <input type="text" name="taskAssignee" placeholder="">
          <button type="submit" class="group__button--add">Add</button>
          <button type="button" class="group__button--cancel">Cancel</button>
        </form>
      </div>
    `;
  }

  createTaskView(task) {
    new TaskView(this.viewModel, this.$target, task);
    console.log(task);
  }
}
