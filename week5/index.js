import createRouter from "./router.js";

const container = document.querySelector("main");
const pages = {
  home: () => (container.innerText = "home page"),
  melon: () => (container.innerText = "melon page"),
  board: (params) => (container.innerText = `${params.name} ${params.song}`),
};

window.addEventListener("click", (event) => {
  if (event.target.matches("[data-navigate]")) {
    router.navigate(event.target.dataset.navigate);
  }
});

const router = createRouter();

router
  .addRouter("#/", pages.home)
  .addRouter("#/melon", pages.melon)
  .addRouter("#/melon/:name/:song", pages.board)
  .start();
