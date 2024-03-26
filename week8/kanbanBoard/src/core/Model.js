
import Observable from '../core/Observable.js';
import initialData from '../utils/initialData.js';

export default class Model extends Observable {
    constructor() {
        super();
        this.state = this.initializeState();
    }

    setState(state) {
        this.state = state;
        this.saveState();
    }

    initializeState() {
        const data = localStorage.getItem('data');
        if (data) return JSON.parse(data);

        localStorage.setItem('data', JSON.stringify(initialData));
        return initialData;
    }

    saveState() {
        localStorage.setItem('data', JSON.stringify(this.state));
    }
}