import View from "../core/View.js";
import TaskView from "./TaskView.js";

export default class GroupView extends View {
    constructor(controller, { groupId, groupTitle, groupTask }) {
        super(controller)

        this.groupId = groupId;
        this.groupTitle = groupTitle;
        this.groupTask = groupTask;
    }

    initialize(parent) {
        this.$target.className = 'group';
        this.$target.dataset.gid = this.groupId;

        this.$target.innerHTML = this.template();
        this.documentFrag.appendChild(this.$target);
        parent.appendChild(this.documentFrag);

        this.controller.registerGroupContainer(this.$target)

        this.groupTask.forEach((task) => this.createTaskView(task));
    }

    createTaskView(task) {
        console.log(task)
        const taskView = new TaskView(this.controller, task);
        taskView.initialize(this.$target)
    }

    template() {
        return `
            <div class="group-header">
                <h2>${this.groupTitle}</h2>
                <button type="button" class="btn-toggle">&#43;</button>
                <button type="button" class="btn-delete">삭제</button>
            </div>

            <div class="group-body">
                <form class="group-form">
                    <textarea class="task-title" name="taskTitle" placeholder="Enter a note"></textarea>
                    작성자 : <input type="text" class="task-assignee" name="taskAssignee">
                    <button type="submit" class="btn-add">Add</button>
                    <button type="button" class="btn-cancel">Cancel</button>
                </form>
            </div>
        `;
    }
}
