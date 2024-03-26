import View from "../core/View.js";

export default class TaskView extends View {
  constructor(viewModel, $parent, { }) {
    super(viewModel, $parent);
    // this.groupId = groupId;
    // this.groupTask = groupTask;
    // this.groupTitle = groupTitle;
  }

  initialize() {
    this.$target.id = taskId;
    this.$target.className = "task";
    this.$target.draggable = true;

    this.viewModel.registerDraggable(this.$target);
  }

  template() {
    return `
      <div class="task-header">
         <div class="title">${taskTitle}</div>
         <button type="button" class="btn-delete"></button>
      </div>
      <div class="task-footer">
         <div class="assignee">${taskAssignee}</div>
      </div>
   `;
  }
}
