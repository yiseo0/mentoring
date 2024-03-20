import Observable from '../lib/observable.js';

export default class BoardModel extends Observable {
    constructor() {
        super();
        this.todos = [];
    }

    get _todos() {
        return this.todos;
    }

    addTodo(todoText) {
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false,
        }

        this.todos.push(todo)
        this.notify(this.todos);
    }
}