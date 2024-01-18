const { cloneDeep } = require('./utils');

describe("cloneDeep 테스트", () => {
    let obj = [{ x: 1 }, { y: 2 }];
    let deepCopy = cloneDeep(obj);

    it("원본과 깊은 복사본이 같은지 확인", () => {
        expect(deepCopy).toEqual(obj);
    })

    it("원본 값이 변경될 때 깊은 복사본 값이 변경되는지 확인", () => {
        obj[0].x = 10;
        expect(deepCopy[0].x).not.toBe(obj[0].x);
    })
})

