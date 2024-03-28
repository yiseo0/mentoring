class Observable {
    constructor() {
        this._observers = new Set();
    }
    subscribe(observer) {
        this._observers.add(observer)
    }
    unsubscribe(observer) {
        this._observers = [...this._observers].filter(subscribe => subscribe !== observer)
    }
    notify(data) {
        this._observers.forEach(observer => observer(data))
    }
}

const source$ = new Observable();


source$.subscribe((data) => {
    console.log(`movie is ${data}`);
})

document.body.addEventListener('click', () => source$.notify('어벤져스'))