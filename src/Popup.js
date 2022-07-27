class Popup {
    constructor(popupElement, configCard) {
        this._popupElement = popupElement,
        this._config = configCard
    }

    open() {
        this._popupElement.classList.add(this._config.popupIsOpened);
        this.setEventListeners();
    }

    close() {
        this._popupElement.classList.remove(this._config.popupIsOpened);
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    _handleOutsideClick(event) {
        if (event.target.classList.contains(this._config.popup)) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton = this._popupElement.querySelector(this._config.popupCloseIcons);
        this._closeButton.addEventListener('click', this.close.bind(this));
        this._popupElement.addEventListener('mousedown', this._handleOutsideClick.bind(this));
        window.addEventListener('keydown', this._handleEscClose.bind(this));
    }
}

export default Popup