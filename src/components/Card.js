class Card {
    constructor(configCard, item, cardPopupData, cardDeletePopup, userId, setLike) {
        this._item = item,
        this._config = configCard,
        this._cardPopupData = cardPopupData,
        this._cardDeletePopup = cardDeletePopup,
        this._itemName = item.name,
        this._itemImage = item.link,
        this._itemLikes = item.likes,
        this._itemId = item._id,
        this._ownerId = item.owner,
        this._userId = userId,
        this._setLike = setLike
    }
    _getTemplate() {
        return document.querySelector(this._config.template)
            .content
            .querySelector(this._config.templateItem)
            .cloneNode(true);
    }

    _addEventListeners() {
        this._deleteCardButton = this._view.querySelector(this._config.cardDeleteButton);
        this._deleteCardButton.addEventListener('click', () => this._cardDeletePopup(this._itemId, this._view));
        this._likeButton = this._view.querySelector(this._config.cardLikeButton);
        this._likeButton.addEventListener('click', this._setLikes.bind(this));
        this._cardImage.addEventListener('click', () => this._cardPopupData({name: this._cardImage.alt, link: this._cardImage.src}));
    }

    _checkLike() {
        const like = this._itemLikes.some(item => item._id === this._userId)
        if (like) {
            this._likeButton.classList.add(this._config.cardIsLiked)
        }
    }

    _setLikes() {
        const like = this._itemLikes.some(item => item._id === this._userId)
        return this._setLike(this._itemId, like, this._itemLikes.length)
        .then((res) => {
            this._itemLikes = res.likes;
            this._likesNumber.textContent = res.likes.length;
            this._likeButton.classList.toggle(this._config.cardIsLiked);
        })
    }

    _checkId() {
        if (this._userId !== this._ownerId._id) {
            this._deleteCardButton.setAttribute('hidden','')
        } 
    }

    createCard() {
        this._view = this._getTemplate();
        this._cardName = this._view.querySelector(this._config.cardName); 
        this._cardName.textContent = this._itemName; 
        this._cardImage = this._view.querySelector(this._config.cardImage);
        this._cardImage.src = this._itemImage;
        this._cardImage.alt = this._itemName;
        this._likesNumber = this._view.querySelector(this._config.cardLikeNumber);
        this._likesNumber.textContent = (Array.isArray(this._itemLikes)) ? this._itemLikes.length : 0;
        this._addEventListeners();
        this._checkLike();
        this._checkId();
        return this._view;
    }

}

export default Card;