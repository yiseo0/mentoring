import { MyPromise } from ".";

describe("Promise then() 테스트", () => {
  it("then을 호출하면 resolve의 결과를 반환한다.", async () => {
    return buildPromise().then((result) => {
      expect(result).toBe(1);
    });
  });

  it("then을 호출하면 비동기 코드의 resolve의 결과를 반환한다.", async () => {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 1);
    }).then((result) => {
      expect(result).toBe(1);
    });
  });

  it("then 결과를 체이닝하여 호출할 수 있다.", async () => {
    return buildPromise(10)
      .then((result) => {
        if (typeof result === "number") return result + 1;
      })
      .then((result) => expect(result).toBe(11));
  });
});

describe("Promise catch() 테스트", () => {
  it("catch를 호출하면 reject의 결과를 반환한다.", async () => {
    return buildPromise(undefined, true).catch((result) => {
      expect(result).toBe(1);
    });
  });

  it("프로미스 콜백함수 안에서 예외 발생시 reject의 결과를 반환한다.", async () => {
    return new MyPromise((resolve, reject) => {
      throw 1;
    }).catch((result) => expect(result).toBe(1));
  });

  it("then에서 예외 발생시 catch를 체이닝으로 호출할 수 있다.", async () => {
    return buildPromise(10)
      .then((result) => {
        if (typeof result === "number") throw result + 1;
      })
      .catch((result) => expect(result).toBe(11));
  });
});

describe("Promise finally() 테스트", () => {
  it("finally는 Promse의 상태가 Fulfilled 또는 Rejected일 때 호출된다.", async () => {
    let count = 0;
    try {
      await buildPromise().finally(() => count++);
      await buildPromise(undefined, true).finally(() => count++);
    } catch (error) {
    } finally {
      expect(count).toBe(2);
    }
  });

  it("then 또는 catch 이후 finally로 체이닝할 수 있다.", async () => {
    let count = 0;
    try {
      await buildPromise()
        .then()
        .finally(() => count++);
      await buildPromise(undefined, true)
        .catch()
        .finally(() => count++);
    } catch (error) {
    } finally {
      expect(count).toBe(2);
    }
  });
});

const buildPromise = (value = 1, isReject = false) => {
  return new MyPromise((resolve, reject) => {
    isReject ? reject(value) : resolve(value);
  });
};
