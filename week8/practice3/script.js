const tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
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

      if (currentDroppable != droppableBelow) {
        if (currentDroppable) {
          // 드롭 가능한 요소에 마우스가 나갈 때 처리하는 로직
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // 드롭 가능한 요소에 마우스가 들어올 때 처리하는 로직
          enterDroppable(currentDroppable);
        }
      }

      // task 요소에 마우스가 들어올 때 처리하는 로직
      if (elemBelow.matches(".task")) {
        // task 잔상 처리
        elemBelow.before(cloneTask);
        return;
      }

      if (droppableBelow) {
        droppableBelow.append(cloneTask);
      }
    };

    document.addEventListener("mousemove", onMouseMove);

    // task 드롭 및 불필요한 핸들러 제거
    task.onmouseup = () => {
      document.removeEventListener("mousemove", onMouseMove);
      task.onmouseup = null;

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
  };
});

const leaveDroppable = (currentDroppable) => {
  currentDroppable.classList.remove("on");
};

function enterDroppable(currentDroppable) {
  currentDroppable.classList.add("on");
}
