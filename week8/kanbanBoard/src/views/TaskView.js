import View from "../core/View.js";

export default class TaskView extends View {
    constructor(controller, { taskId, taskTitle, taskAssignee, taskUpdateAt }) {
        super(controller);

        this.taskId = taskId;
        this.taskTitle = taskTitle;
        this.taskAssignee = taskAssignee;
        this.taskUpdateAt = taskUpdateAt;
    }

    initialize(parent) {
        this.$target.className = "task";
        this.$target.dataset.gid = this.taskId;
        this.$target.draggable = true;

        this.$target.innerHTML = this.template();
        this.documentFrag.appendChild(this.$target);
        parent.appendChild(this.documentFrag);

        this.controller.registerDraggable(this.$target);
    }

    template() {
        return `
            <div class="task-header">
                <div class="title">${this.taskTitle}</div>
                <button type="button" class="btn-delete"></button>
            </div>
            <div class="task-body">
                <div class="task-assignee">${this.taskAssignee}</div>
            </div>
        `;
    }
}
