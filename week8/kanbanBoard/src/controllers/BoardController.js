import Controller from "../core/Controller.js";
import { getDragAfterElement } from "../utils/utils.js";

export default class BoardController extends Controller {
  constructor(model) {
    super(model);
  }

  getBoardData() {
    return this.model.getBoardData();
  }

  registerDraggable(draggableNode) {
    draggableNode.addEventListener("dragstart", (event) => {
      event.stopPropagation();

      this.$targetDraggable = draggableNode;
      draggableNode.classList.add("dragging");
    });

    draggableNode.addEventListener("dragend", (event) => {
      event.target.classList.remove("dragging");

      const $parent = draggableNode.parentNode;

      const gid = draggableNode.dataset.gid;
      const tid = draggableNode.id;
      const targetGroupId = $parent.parentNode.id;
      const targetIdx = [...$parent.children].findIndex(
        (target) => target === draggableNode
      );

      this.model.changeTaskOrder(gid, tid, targetGroupId, targetIdx);
    });
  }

  registerGroupContainer(GroupContainer) {
    GroupContainer.addEventListener("dragover", (event) => {
      event.preventDefault();

      const tasks = [
        ...GroupContainer.querySelectorAll(`.task:not(.dragging)`),
      ];
      const afterElement = getDragAfterElement(tasks, event.clientY);

      GroupContainer.querySelector(".group-footer").insertBefore(
        this.$targetDraggable,
        afterElement
      );
    });
  }

  registerSubmitTask(taskForm) {
    taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const gid = taskForm.closest(".group").id;
      const { taskTitle, taskAssignee } = taskForm;

      this.model.addTask(gid, taskTitle.value, taskAssignee.value);
    });
  }

  registerDeleteTask(deleteButton, gid, tid) {
    deleteButton.addEventListener("click", () => {
      this.model.deleteTask(gid, tid);
    });
  }
}
