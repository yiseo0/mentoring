/**
 *
 * @param {Array} elements 후보 요소 목록
 * @param {Number} y e.clientY
 * @returns {HTMLElement} insertBefore 2번째 인자
 */
export const getDragAfterElement = (elements, y) => {
    return elements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
};
