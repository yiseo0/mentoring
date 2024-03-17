import BoardModel from './models/BoardModel.js'
import BoardView from './views/BoardView.js'

const boardModel = new BoardModel();
const boardView = new BoardView(boardModel);