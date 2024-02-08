"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneDeep = void 0;
/** 깊은 복사를 실행하는 함수 */
const cloneDeep = (target) => {
    if (typeof target !== "object" || target === null) {
        return target;
    }
    if (Array.isArray(target)) {
        return target.map((item) => (0, exports.cloneDeep)(item));
    }
    const entries = Object.entries(target);
    const copy = entries.reduce((acc, [key, value]) => {
        acc[key] = (0, exports.cloneDeep)(value);
        return acc;
    }, {});
    return copy;
};
exports.cloneDeep = cloneDeep;
