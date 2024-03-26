import boardModel from "./models/BoardModel.js";
import BoardViewModel from "./viewModels/boardViewModel.js";
import HeaderView from "./views/HeaderView.js";
import BoardView from "./views/BoardView.js";

const app = () => {
  const $root = document.querySelector("#root");

  const boardViewModel = new BoardViewModel(boardModel);
  const header = new HeaderView(boardViewModel, $root);
  const board = new BoardView(boardViewModel, $root);
};

window.addEventListener("DOMContentLoaded", () => {
  app();
});
