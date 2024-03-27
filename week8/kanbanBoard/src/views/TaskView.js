import View from "../core/View.js";
import { TASK, ADD, DELETE } from "../utils/constants.js";

export default class TaskView extends View {
  constructor(controller, { taskId, taskTitle, taskAssignee }) {
    super(controller);

    this.taskId = taskId;
    this.taskTitle = taskTitle;
    this.taskAssignee = taskAssignee;
  }

  initialize(parent) {
    this.$target.className = "task";
    this.$target.id = this.taskId;
    this.$target.dataset.gid = parent.parentNode.id;
    this.$target.draggable = true;

    this.$target.innerHTML = this.template();
    this.documentFrag.appendChild(this.$target);
    parent.appendChild(this.documentFrag);

    this.controller.registerDraggable(this.$target);

    this.$deleteButton = this.$target.querySelector(".btn-delete");
    this.controller.registerDeleteTask(
      this.$deleteButton,
      this.$target.dataset.gid,
      this.$target.id
    );
  }

  template() {
    return `
      <div class="task-title">${this.taskTitle}</div>
      <div class="task-assignee">
          <small>Added by</small> ${this.taskAssignee}
			</div>
			<button type="button" class="btn-delete">&times;</button>
    `;
  }

  update() {
    this.$target.dataset.gid = targetGroupId;
  }

  render(notifyData) {
    const { type, action, targetId, targetGroupId } = notifyData;

    if (type === TASK && this.$target.id === targetId) {
      switch (action) {
        case ADD:
          this.update();
        case DELETE:
          this.remove();
      }
    }
  }
}
