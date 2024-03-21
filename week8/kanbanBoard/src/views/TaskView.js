/*
   - 드래그앤드랍 이벤트 리팩터링 필요
*/
import View from "../core/View.js";

export default class TaskView extends View {
  initialize() {
    const { taskId } = this.props;

    this.$target.id = taskId;
    this.$target.className = "task";

    this.draggableTask();
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

  setEvent() {
    this.addEvent("click", "button", () => {
      console.log("삭제");
    });
  }

  draggableTask() {
    const task = this.$target;

    task.onmousedown = (event) => {
      // task 클릭 위치 저장한 변수
      let shiftX = event.clientX - task.getBoundingClientRect().left;
      let shiftY = event.clientY - task.getBoundingClientRect().top;

      // task 포인터 이동 함수
      const moveTask = (pageX, pageY) => {
        task.style.left = pageX - shiftX + "px";
        task.style.top = pageY - shiftY + "px";
      };
      moveTask(event.pageX, event.pageY);

      // task 잔상 처리
      const cloneTask = task.cloneNode(true);
      cloneTask.classList.add("clone");
      task.before(cloneTask);

      // task body를 기준으로 이동
      document.body.append(task);

      // task를 맨 앞에서 움직일 수 있도록 absolute 및 zIndex 수정
      task.style.position = "absolute";
      task.style.zIndex = "1000";

      // 현재 드롭 가능한 요소 위에 있는지 확인하는 변수
      let currentDroppable = null;

      const onMouseMove = (event) => {
        moveTask(event.pageX, event.pageY);

        // 드롭 가능한 요소 감지
        // task를 숨기지 않으면 드롭 가능한 요소를 감지하지 않는다.
        task.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        task.hidden = false;

        // 윈도우 밖 마우스 이벤트 트리거 방지
        // clientX,clientY가 윈도우 밖에 있으면, elementFromPoint는 null을 반환한다.
        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest(".droppable");

        // 이미 드롭 가능한 요소에 마우스가 들어와 있으면 로직이 실행되지 않는다.
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) {
            // 드롭 가능한 요소에 마우스가 나갈 때 처리하는 로직
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) {
            // 드롭 가능한 요소에 마우스가 들어올 때 처리하는 로직
            enterDroppable(currentDroppable);
            droppableBelow.append(cloneTask);
          }
        }

        // 이미 드롭 가능한 요소에 마우스가 들어와 있으면 로직이 실행된다.
        // task 순서 변경 시 실행되는 로직
        if (elemBelow.matches(".task")) {
          const cloneTaskRect = cloneTask.getBoundingClientRect();
          const cloneTaskCoord = cloneTaskRect.top + cloneTaskRect.height / 2;

          // cloneTask 위치를 기준으로 잔상처리
          if (cloneTaskCoord < event.pageY) {
            elemBelow.after(cloneTask);
            return;
          }
          elemBelow.before(cloneTask);
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      // task 드롭 및 불필요한 핸들러 제거
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        if (currentDroppable) {
          currentDroppable.classList.remove("on");
        }

        // task 드롭
        task.style.position = "static";
        task.style.zIndex = "1";

        // task 잔상 처리
        cloneTask.before(task);
        cloneTask.remove();
      };

      document.addEventListener("mouseup", onMouseUp);
    };

    const leaveDroppable = (currentDroppable) => {
      currentDroppable.classList.remove("on");
    };

    const enterDroppable = (currentDroppable) => {
      currentDroppable.classList.add("on");
    };
  }
}
