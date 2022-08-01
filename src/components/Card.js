class Card {
    constructor(configCard, item, cardPopupData) {
        this._config = configCard,
        this._cardPopupData = cardPopupData,
        this._itemName = item.name,
        this._itemImage = item.link
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
        this._cardImage.addEventListener('click', () => this._cardPopupData({name: this._cardImage.alt, link: this._cardImage.src}));
    }

    _deleteCard() {
        this._view.remove();
        this._view = null;
    } 

    _like() {
        this._likeButton.classList.toggle(this._config.cardIsLiked);
    }

    createCard() {
        this._view = this._getTemplate();
        this._cardName = this._view.querySelector(this._config.cardName); 
        this._cardName.textContent = this._itemName; 
        this._cardImage = this._view.querySelector(this._config.cardImage);
        this._cardImage.src = this._itemImage;
        this._cardImage.alt = this._itemName;
        this._addEventListeners();
        return this._view;
    }

}

export default Card;