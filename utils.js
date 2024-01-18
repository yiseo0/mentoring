"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = exports.cloneDeep = void 0;
/**깊은 복사를 실행하는 함수 */
var cloneDeep = function (target) {
    var result;
    if (typeof target === "object" && target !== null) {
        if (Array.isArray(target)) {
            result = [];
            for (var i = 0; i < target.length; i++) {
                result[i] = (0, exports.cloneDeep)(target[i]);
            }
        }
        else {
            result = {};
            for (var prop in target) {
                result[prop] = (0, exports.cloneDeep)(target[prop]);
            }
        }
    }
    else {
        result = target;
    }
    return result;
};
exports.cloneDeep = cloneDeep;
/**memoize 함수 */
var memoize = function (func) {
    var results = {};
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argsKey = JSON.stringify(args);
        if (results[argsKey]) {
            return results[argsKey];
        }
        else {
            results[argsKey] = func.apply(void 0, args);
            return results[argsKey];
        }
    };
};
exports.memoize = memoize;
