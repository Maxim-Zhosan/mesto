class Card {
    constructor(item, configCard, cardPopupData) {
        this._name = item.name,
        this._link = item.link,
        this._config = configCard,
        this._cardPopupData = cardPopupData
    }
    _getTemplate() {
        return document.querySelector(this._config.template)
            .content
            .querySelector(this._config.templateItem)
            .cloneNode(true);
    }

    _addEventListeners() {
        this._view.querySelector(this._config.cardDeleteButton)
            .addEventListener('click', this._deleteCard.bind(this));
        this._likeButton = this._view.querySelector(this._config.cardLikeButton);
        this._likeButton.addEventListener('click', this._like.bind(this));
        this._cardImage.addEventListener('click', () => this._cardPopupData(this._name, this._link));
    }

    _deleteCard() {
        this._view.remove();
    }

    _like() {
        this._likeButton.classList.toggle(this._config.cardIsLiked);
    }

    createCard() {
        this._view = this._getTemplate();
        this._cardName = this._view.querySelector(this._config.cardName); 
        this._cardName.textContent = this._name; 
        this._cardImage = this._view.querySelector(this._config.cardImage);
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._addEventListeners();
        return this._view;
    }

}

export default Card;