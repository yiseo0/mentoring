const { squire, memoizedSquire, calculateSquare } = require("./index.ts");

describe("Memoization Function 테스트", () => {
  it("memoizedSquire() 는 squire() 보다 호출 횟수가 적어야 한다.", () => {
    const calculateSquareSpy = jest.fn(calculateSquare);
    squire(10, calculateSquareSpy);
    squire(10, calculateSquareSpy);

    expect(calculateSquareSpy).toHaveBeenCalledTimes(2);

    calculateSquareSpy.mockClear();
    memoizedSquire(10, calculateSquareSpy);
    memoizedSquire(10, calculateSquareSpy);

    expect(calculateSquareSpy).toHaveBeenCalledTimes(1);
  });

  it("memoizedSquire() 는 squire() 와 결과가 같다.", () => {
    const result = squire(10, calculateSquare);
    const memoizedResult = memoizedSquire(10, calculateSquare);

    expect(result).toBe(memoizedResult);
  });
});
