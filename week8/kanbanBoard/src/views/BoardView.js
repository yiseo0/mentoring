import View from '../lib/View.js';

export default class BoardView extends View {
    constructor(model) {
        super()

        this.app = this.getElement('#root')

        this.form = this.createElement('form')

        this.input = this.createElement('input')
        this.input.type = 'text'
        this.input.placeholder = 'App todo'
        this.input.name = 'todo'

        this.submitButton = this.createElement('button')
        this.submitButton.type = 'button'
        this.submitButton.textContent = 'Submit'

        this.todoList = this.createElement('ul', 'todo-list')

        this.form.append(this.input, this.submitButton)
        this.app.append(this.form, this.todoList)

        this.boardModel = model;
        this.boardModel.subscribe(this)

        this.render()
    }

    get _todoText() {
        return this.input.value
    }

    _resetInput() {
        this.input.value = ''
    }

    render() {
        this.displayTodos()
        this.bindAddTodo()
    }

    displayTodos() {
        const todos = this.boardModel._todos;

        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild)
        }

        if (todos.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Nothing to do! Add a task?'
            this.todoList.append(p)
        } else {
            todos.forEach(todo => {
                const li = this.createElement('li')
                li.id = todo.id

                const checkbox = this.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.checked = todo.complete

                const span = this.createElement('span', 'editable')
                span.contentEditable = true; // 사용자가 텍스트 내용 편집 가능

                if (todo.complete) {
                    const strike = this.createElement('s')
                    strike.textContent = todo.text
                    span.append(strike)
                } else {
                    span.textContent = todo.text
                }

                const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Delete'
                li.append(checkbox, span, deleteButton)

                this.todoList.append(li)
            })
        }
    }

    bindAddTodo() {
        this.form.addEventListener('submit', event => {
            event.preventDefault()

            if (this._todoText) {
                this.boardModel.addTodo(this._todoText)
                this._resetInput()
            }
        })
    }
}