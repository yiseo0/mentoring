type Task = "syncFunc" | "asyncMacroTask" | "asyncMicroTask";
type Area = "stack" | "webApis" | "macroQueue" | "microQueue" | "console";

/** tasks UI 이동 함수*/
const moveTask = (area: Area, createEl: HTMLDivElement) => {
  const el = document.getElementById(area);

  // tasks UI 이동
  if (area === "stack") el?.prepend(createEl);
  if (area !== "stack") el?.appendChild(createEl);

  // webApis 일 때 아이콘 추가
  if (area === "webApis") {
    const iconEl = document.createElement("span");
    iconEl.classList.add("material-symbols-outlined", "on");
    iconEl.innerText = "history";
    createEl.appendChild(iconEl);
  }
  // macroQueue이거나 microQueue 일 때 아이콘 삭제
  if (area === "macroQueue" || area === "microQueue") {
    const iconEl = createEl.querySelector(".material-symbols-outlined");
    if (iconEl) createEl.removeChild(iconEl);
  }

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

/** 비동기 처리 함수*/
const asyncTask = (task: Task, createEl: HTMLDivElement) => {
  const stackEl = document.querySelector("#stack");
  const microEl = document.querySelector("#microQueue");
  const eventLoopIconEl = document.querySelector("#eventLoop span");
  const eventQueue = task == "asyncMacroTask" ? "macroQueue" : "microQueue";

  moveTask(eventQueue, createEl).then(() => {
    // 이벤트 루프
    const loop = setInterval(() => {
      eventLoopIconEl?.classList.add("on");

      // call stack에 task가 있거나 현재 작업이 macro task이고 macroQueue에 task가 있을 경우 대기
      if (
        stackEl?.hasChildNodes() ||
        (task == "asyncMacroTask" && microEl?.hasChildNodes())
      )
        return;
      clearInterval(loop);
      moveTask("stack", createEl).then(() => moveTask("console", createEl));

      eventLoopIconEl?.classList.remove("on");
    }, 0);
  });
};

document.querySelectorAll("#buttons button").forEach((button: Element) => {
  button.addEventListener("click", (event: Event) => {
    const { id: task, innerText } = event.target as HTMLButtonElement;

    // tasks UI 생성 후 call stack으로 이동
    const createEl = document.createElement("div");
    createEl.innerText = innerText;
    createEl.classList.add(task);

    moveTask("stack", createEl).then(() => {
      // 비동기 처리
      if (task !== "syncFunc") {
        createEl.innerText = `${innerText} Callback`;
        createEl.classList.add("callback");

        moveTask("webApis", createEl).then(() =>
          asyncTask(task as Task, createEl)
        );
        return;
      }
      // 동기 처리
      moveTask("console", createEl);
    });
  });
});

/** console 초기화 */
const clearConsole = () => {
  const consoleEl = document.querySelector("#console");
  if (consoleEl) consoleEl.innerHTML = "";
};
