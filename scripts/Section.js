class Section {
    constructor(objects, list) {
        this._items = objects.items,
        this._function = objects.renderer,
        this._list = list
    }

    renderer() {
        this._items.forEach(item => {
            const card = this._function(item);
            this.addItem(card);
        })
    }

    addItem(card) {
        this._list.prepend(card);
    }
}

export default Section;