const STATE = Object.freeze({
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
})

class Queue {
    #arr = [];
    push(value) {
        this.#arr.push(value)
    }
    pop(value) {
        this.#arr.shift(value)
    }
    top() {
        return this.#arr[0];
    }
    isEmpty() {
        return this.#arr.length == 0;
    }
}

class MyPromise {
    #state = STATE.PENDING
    #value
    #resolveBind = this.#resolve.bind(this)
    #rejectBind = this.#reject.bind(this)
    #thenCallbacks = new Queue()
    #catchCallbacks = new Queue()

    constructor(callback) {
        try {
            callback(this.#resolveBind, this.#rejectBind)
        } catch (error) {
            this.#rejectBind(error)
        }
    }

    #runCallbacks() {
        if (this.#state === STATE.FULFILLED) {
            while (!this.#thenCallbacks.isEmpty()) {
                this.#thenCallbacks.top()(this.#value); // this.#value를 인자로 전달하여 callbacks.top()을 통해 반환된 함수를 호출
                this.#thenCallbacks.pop()
            }
        }

        if (this.#state === STATE.REJECTED) {
            while (!this.#catchCallbacks.isEmpty()) {
                this.#catchCallbacks.top()(this.#value);
                this.#catchCallbacks.pop()
            }
        }
    }
    #resolve(value) {
        queueMicrotask(() => {
            if (this.#state !== STATE.PENDING) return

            this.#state = STATE.FULFILLED
            this.#value = value
            this.#runCallbacks();
        })
    }
    #reject(value) {
        queueMicrotask(() => {
            if (this.#state !== STATE.PENDING) return

            this.#state = STATE.REJECTED
            this.#value = value
            this.#runCallbacks();
        })
    }

    then(thenCallback, catchCallback) {
        return new MyPromise((resolve, reject) => {
            this.#thenCallbacks.push((result) => {
                if (!thenCallback) {
                    resolve(result);
                    return;
                }

                try {
                    resolve(thenCallback(result))
                } catch (error) {
                    reject(error)
                }
            })

            this.#catchCallbacks.push((result) => {
                if (!catchCallback) {
                    reject(result);
                    return;
                }

                try {
                    resolve(catchCallback(result))
                } catch (error) {
                    reject(error)
                }
            })

            this.#runCallbacks();
        })
    }

    catch(catchCallback) {
        return this.then(undefined, catchCallback)
    }

    finally(callback) {
        return this.then((result) => {
            callback()
            return result;
        }, (result) => {
            callback()
            throw result;
        })
    }
}

new MyPromise((resolve) => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
}).then((v) => console.log(v));




