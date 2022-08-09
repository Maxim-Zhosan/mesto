class Section {
    
    constructor(renderFunction, cardListSelector) {
        this._function = renderFunction,
        this._cardListSelector = document.querySelector(cardListSelector)
    }

    renderer(userId, objects) {
        let objectsReversed = objects.map(objects.pop, [...objects]);
        objectsReversed.forEach(item => {
            const card = this._function(userId, item);
            this.addItem(card);
        })
    }

    addItem(card) {
        this._cardListSelector.prepend(card);
    }
}

export default Section; 