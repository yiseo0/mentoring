export default class View {
    constructor(controller) {
        this.controller = controller;
        this.controller.model.subscribe(this)

        this.documentFrag = document.createDocumentFragment();
        this.$target = document.createElement("div");
    }

    initialize() { }

    template() {
        return "";
    }
}