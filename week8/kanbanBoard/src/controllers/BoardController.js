import Controller from "../core/Controller.js";
import { getDragAfterElement } from "../utils/utils.js";

export default class BoardController extends Controller {
    constructor(model) {
        super(model);
    }

    getBoardData() {
        return this.model.getBoardData()
    }

    registerDraggable(draggableNode) {
        draggableNode.addEventListener("dragstart", (event) => {
            event.stopPropagation();

            this.$targetDraggable = draggableNode;
            draggableNode.classList.add("dragging");
        });

        document.addEventListener("dragend", (event) => {
            event.target.classList.remove("dragging");
        });
    }

    registerGroupContainer(GroupContainer) {
        GroupContainer.addEventListener("dragover", (event) => {
            event.preventDefault();

            const tasks = [
                ...GroupContainer.querySelectorAll(`.task:not(.dragging)`),
            ];
            const afterElement = getDragAfterElement(tasks, event.clientY);

            GroupContainer.insertBefore(this.$targetDraggable, afterElement);
        });
    }
}
