/**깊은 복사를 실행하는 함수 */
export const cloneDeep = <T>(target: T) => {
  let result: any;
  if (typeof target === "object" && target !== null) {
    if (Array.isArray(target)) {
      result = [];
      for (let i = 0; i < target.length; i++) {
        result[i] = cloneDeep(target[i]);
      }
    } else {
      result = {};
      for (let prop in target) {
        result[prop] = cloneDeep(target[prop]);
      }
    }
  } else {
    result = target;
  }
  return result;
};
