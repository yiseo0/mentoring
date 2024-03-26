import View from "../core/View.js";
import GroupView from "./GroupView.js";

export default class BoardView extends View {

    initialize(parent) {
        this.$target.id = 'board';

        this.$target.innerHTML = this.template();
        this.documentFrag.appendChild(this.$target);
        parent.appendChild(this.documentFrag);

        const groupList = this.controller.getBoardData();
        groupList.forEach((group) => this.createGroupView(group));
    }

    createGroupView(group) {
        const groupView = new GroupView(this.controller, group);
        groupView.initialize(this.$target);
    }
}
