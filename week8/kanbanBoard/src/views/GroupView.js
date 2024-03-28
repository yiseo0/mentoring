import View from "../core/View.js";
import TaskView from "./TaskView.js";
import { GROUP } from "../utils/constants.js";

export default class GroupView extends View {
  constructor(controller, { groupId, groupTitle, groupTasks }) {
    super(controller);

    this.groupId = groupId;
    this.groupTitle = groupTitle;
    this.groupTasks = groupTasks;
  }

  initialize(parent) {
    this.$target.className = "group";
    this.$target.id = this.groupId;

    this.$target.innerHTML = this.template();
    this.documentFrag.appendChild(this.$target);
    parent.appendChild(this.documentFrag);

    this.controller.registerGroupContainer(this.$target);

    this.$form = this.$target.querySelector(".task-form");
    this.controller.registerSubmitTask(this.$form);

    this.$groupFooter = this.$target.querySelector(".group-footer");
    this.groupTasks.forEach((task) => this.createTaskView(task));
  }

  createTaskView(task) {
    const taskView = new TaskView(this.controller, task);
    taskView.initialize(this.$groupFooter);
  }

  template() {
    return `
      <div class="group-header">
				<h2>${this.groupTitle}</h2>
        <div class="buttons">
          <button type="button" class="btn-toggle">&#43;</button>
          <button type="button" class="btn-delete">&times;</button>
        </div>
      </div>

      <div class="group-body">
				<form class="task-form">
					<textarea class="task-title" name="taskTitle" placeholder="Enter a note"></textarea>
					<input type="text" class="task-assignee" name="taskAssignee">
					<div class="buttons">
            <button type="submit" class="btn-add">Add</button>
            <button type="button" class="btn-cancel">Cancel</button>
          </div>
				</form>
      </div>

      <div class="group-footer"></div>
  `;
  }

  render(notifyData) {
    const { type, targetId, target } = notifyData;

    if (type === GROUP && targetId === this.groupId) {
      this.createTaskView(target);
    }
  }
}
