type State = "PENDING" | "FULFILLED" | "REJECTED";

const STATE: Record<string, State> = Object.freeze({
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
});

class Queue<T> {
  #arr: T[] = [];
  push(value: T): void {
    this.#arr.push(value);
  }
  pop(): void {
    this.#arr.shift();
  }
  top(): T | undefined {
    return this.#arr[0];
  }
  isEmpty(): boolean {
    return this.#arr.length == 0;
  }
}

class MyPromise<T> {
  #state: State = STATE.PENDING;
  #value: T | undefined;
  #resolveBind = this.#resolve.bind(this);
  #rejectBind = this.#reject.bind(this);
  #thenCallbacks = new Queue<(value: T) => void>();
  #catchCallbacks = new Queue<(value: T) => void>();

  constructor(
    callback: (resolve: (value: T) => void, reject: (value: T) => void) => void
  ) {
    try {
      callback(this.#resolveBind, this.#rejectBind);
    } catch (error) {
      this.#rejectBind(error as T);
    }
  }

  #runCallbacks(): void {
    if (this.#state === STATE.FULFILLED) {
      while (!this.#thenCallbacks.isEmpty()) {
        const callback = this.#thenCallbacks.top();
        if (callback) callback(this.#value as T);

        this.#thenCallbacks.pop();
      }
    }

    if (this.#state === STATE.REJECTED) {
      while (!this.#catchCallbacks.isEmpty()) {
        const callback = this.#catchCallbacks.top();
        if (callback) callback(this.#value as T);

        this.#catchCallbacks.pop();
      }
    }
  }
  #resolve(value: T): void {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      this.#state = STATE.FULFILLED;
      this.#value = value;
      this.#runCallbacks();
    });
  }
  #reject(value: T): void {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      this.#state = STATE.REJECTED;
      this.#value = value;
      this.#runCallbacks();
    });
  }

  then(
    thenCallback?: (value: T) => T | PromiseLike<T>,
    catchCallback?: (value: T) => T | PromiseLike<T>
  ) {
    return new MyPromise((resolve, reject) => {
      this.#thenCallbacks.push((result) => {
        if (!thenCallback) {
          resolve(result);
          return;
        }

        try {
          resolve(thenCallback(result));
        } catch (error) {
          reject(error);
        }
      });

      this.#catchCallbacks.push((result) => {
        if (!catchCallback) {
          reject(result);
          return;
        }

        try {
          resolve(catchCallback(result));
        } catch (error) {
          reject(error);
        }
      });

      this.#runCallbacks();
    });
  }

  catch(catchCallback: (value: T) => T | PromiseLike<T>) {
    return this.then(undefined, catchCallback);
  }

  finally(callback: () => T | PromiseLike<T>) {
    return this.then(
      (result) => {
        callback();
        return result;
      },
      (result) => {
        callback();
        throw result;
      }
    );
  }
}

new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
}).then((v) => console.log(v));
