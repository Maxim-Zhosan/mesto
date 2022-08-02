class Section {
    constructor(objects, cardListSelector) {
        this._items = objects.items,
        this._function = objects.renderer,
        this._cardListSelector = document.querySelector(cardListSelector)
    }

    renderer() {
        this._items.forEach(item => {
            const card = this._function(item);
            this.addItem(card);
        })
    }

    addItem(card) {
        this._cardListSelector.prepend(card);
    }
}

export default Section; 