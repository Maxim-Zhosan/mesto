import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupElement, submitFunction, configCard) {
        super(popupElement, configCard),
        this._element = popupElement,
        this._submitFunction = submitFunction
    }

    _getInputValues() {
        this._cardNameInput = this._element.querySelector(this._config.popupInputPlaceName).value;
        this._cardLinkInput = this._element.querySelector(this._config.popupInputPlaceLink).value;
        return {name: this._cardNameInput, link: this._cardLinkInput};
    }

    setEventListeners() {
        this._submit = (event) => {
            event.preventDefault();
            this._items = this._getInputValues();
            this._submitFunction(this._items);
            this.close();
        }
        this._element.addEventListener('submit', this._submit);
        super.setEventListeners();
    }

    close() {
        this._element.removeEventListener('submit', this._submit);
        this._element.querySelector(this._config.popupInputPlaceName).value = '';
        this._cardLinkInput = this._element.querySelector(this._config.popupInputPlaceLink).value = '';
        super.close();
    }

}

export default PopupWithForm;