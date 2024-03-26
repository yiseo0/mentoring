
import Model from '../core/Model.js';

class BoardModel extends Model {
    constructor() {
        super();
    }

    getBoardData() {
        return this.state.board;
    }
}

export default new BoardModel()
