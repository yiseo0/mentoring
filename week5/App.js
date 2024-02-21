import SectionPage1 from "./SectionPage1.js";
import SectionPage2 from "./SectionPage2.js";
import SectionPage3 from "./SectionPage3.js";
import createRouter from "./router.js";

export default function App({ target }) {
  const router = createRouter(target);

  router.init([
    { path: "/week5/", page: () => new SectionPage1({ target }) },
    { path: "/week5/2", page: () => new SectionPage2({ target }) },
    { path: "/week5/3", page: () => new SectionPage3({ target }) },
  ]);

  window.addEventListener("click", (event) => {
    if (event.target.matches("[data-navigate]")) {
      router.push(event.target.dataset.navigate);
    }
  });
}
