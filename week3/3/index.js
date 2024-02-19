"use strict";
/** tasks UI 이동 함수*/
const moveTask = (area, createEl) => {
    const el = document.getElementById(area);
    // tasks UI 이동
    if (area === "stack") {
        el === null || el === void 0 ? void 0 : el.prepend(createEl);
    }
    if (area !== "stack")
        el === null || el === void 0 ? void 0 : el.appendChild(createEl);
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
        if (iconEl)
            createEl.removeChild(iconEl);
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
};
/** 비동기 처리 함수*/
const asyncTask = (task, createEl) => {
    const stackEl = document.querySelector("#stack");
    const microEl = document.querySelector("#microQueue");
    const eventLoopIconEl = document.querySelector("#eventLoop span");
    const eventQueue = task == "asyncMacroTask" ? "macroQueue" : "microQueue";
    moveTask(eventQueue, createEl).then(() => {
        // 이벤트 루프
        const loop = setInterval(() => {
            eventLoopIconEl === null || eventLoopIconEl === void 0 ? void 0 : eventLoopIconEl.classList.add("on");
            // call stack에 task가 있거나 현재 작업이 macro task이고 macroQueue에 task가 있을 경우 대기
            if ((stackEl === null || stackEl === void 0 ? void 0 : stackEl.hasChildNodes()) ||
                (task == "asyncMacroTask" && (microEl === null || microEl === void 0 ? void 0 : microEl.hasChildNodes())))
                return;
            clearInterval(loop);
            moveTask("stack", createEl).then(() => moveTask("console", createEl));
            eventLoopIconEl === null || eventLoopIconEl === void 0 ? void 0 : eventLoopIconEl.classList.remove("on");
        }, 0);
    });
};
document.querySelectorAll("#buttons button").forEach((button) => {
    button.addEventListener("click", (event) => {
        const { id: task, innerText } = event.target;
        // tasks UI 생성 후 call stack으로 이동
        const createEl = document.createElement("div");
        createEl.innerText = innerText;
        createEl.classList.add(task);
        moveTask("stack", createEl).then(() => {
            // 비동기 처리
            if (task !== "syncFunc") {
                createEl.innerText = `${innerText} callback`;
                createEl.classList.add("callback");
                moveTask("webApis", createEl).then(() => asyncTask(task, createEl));
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
    if (consoleEl)
        consoleEl.innerHTML = "";
};
