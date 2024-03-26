import BoardController from './controllers/BoardController.js';
import boardModel from './models/BoardModel.js';
import HeaderView from './Views/HeaderView.js';
import BoardView from './Views/BoardView.js';

const initializeApp = () => {
    const $app = document.querySelector('#app')

    const boardController = new BoardController(boardModel)
    const header = new HeaderView(boardController);
    const board = new BoardView(boardController);

    header.initialize($app)
    board.initialize($app)
}

window.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});