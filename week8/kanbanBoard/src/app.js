import BoardModel from "./models/BoardModel.js";
import HeaderView from "./views/HeaderView.js";
import BoardView from "./views/BoardView.js";

const app = () => {
  const $root = document.querySelector("#root");

  const boardModel = new BoardModel();
  const header = new HeaderView(boardModel, $root);
  const board = new BoardView(boardModel, $root);
};

window.addEventListener("DOMContentLoaded", () => {
  app();
});
