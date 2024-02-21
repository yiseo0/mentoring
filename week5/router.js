export default function createRouter(target) {
  let routes = [];

  const router = {
    init(initialRoutes) {
      routes = initialRoutes;
      this.render();
    },
    render() {
      const { pathname } = location;
      const matchedRoute = routes.find((route) => pathname === route.path);

      if (matchedRoute) {
        target.innerHTML = "";
        matchedRoute.page().render();
      }
    },
    push(path) {
      history.pushState("", "", path);
      this.render();
    },
  };

  window.addEventListener("popstate", () => {
    router.render();
  });

  return router;
}
