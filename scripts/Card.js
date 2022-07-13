class Card {
    constructor(item, configCard, cardPopupData) {
        this._name = item.name,
        this._link = item.link,
        this._config = configCard
        this._cardPopupData = cardPopupData
    }
    _getTemplate() {
        return document.querySelector(this._config.template)
            .content.children[0].cloneNode(true);
    }

    _addEventListeners() {
        this._view.querySelector(this._config.cardDeleteButton)
            .addEventListener('click', this._deleteCard.bind(this));
        this._view.querySelector(this._config.cardLikeButton)
            .addEventListener('click', this._like.bind(this));
        this._view.querySelector(this._config.cardImage)
            .addEventListener('click', () => this._cardPopupData(this._name, this._link));
    }

    _deleteCard() {
        this._view.remove();
    }

    _like() {
        this._view
            .querySelector(this._config.cardLikeButton)
            .classList.toggle(this._config.cardIsLiked);
    }

    createCard() {
        this._view = this._getTemplate();
        const cardName = this._view.querySelector(this._config.cardName);
        cardName.textContent = this._name;
        const cardImage = this._view.querySelector(this._config.cardImage);
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._addEventListeners();
        return this._view;
    }

}

export default Card;