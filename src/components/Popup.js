class Popup {
    constructor(popupSelector, configCard) {
        this._popupSelector = popupSelector,
        this._config = configCard,
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    _handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close();
        }
    }

    _handleOutsideClick(event) {
        if (event.target.classList.contains(this._config.popup)) {
            this.close();
        }
    }

    open() {
        this._popupSelector.classList.add(this._config.popupIsOpened);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove(this._config.popupIsOpened);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._closeButton = this._popupSelector.querySelector(this._config.popupCloseIcons);
        this._closeButton.addEventListener('click', this.close.bind(this));
        this._popupSelector.addEventListener('mousedown', this._handleOutsideClick.bind(this));
    }
}

export default Popup