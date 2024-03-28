export default class Component {
    $target;
    props;
    state;
    constructor($target, props) {
        this.$target = $target;
        this.props = props;
        this.setup();
        this.setEvent(); // constructor에서 한 번만 실행
        this.render();
    }
    setup() { }
    mounted() { }
    template() { return ''; }
    render() {
        this.$target.innerHTML = this.template();
        this.mounted();
    }
    setEvent() { }
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }
    addEvent(eventType, selector, callback) {
        const children = [...this.$target.querySelectorAll(selector)];
        this.$target.addEventListener(eventType, event => {
            if (!event.target.closest(selector)) return false;
            callback(event);
        })
    }
}