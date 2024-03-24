import View from "../core/View.js";

export default class TaskView extends View {
  initialize() {
    const { taskId } = this.props;

    this.$target.id = taskId;
    this.$target.className = "task";
    this.$target.draggable = true;

    this.viewModel.registerDraggable(this.$target);
  }

  template() {
    const { taskTitle, taskAssignee } = this.props;

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
