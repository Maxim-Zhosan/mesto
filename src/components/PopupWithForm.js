import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunction, configCard) {
        super(popupSelector, configCard),
        this._submitFunction = submitFunction,
        this._popupForm = this._popupSelector.querySelector(configCard.popupForm)
    }

    _getInputValues() {
        this._inputList = this._popupSelector.querySelectorAll(this._config.popupInput);
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    _submit = (event) => {
        event.preventDefault();
        this._items = this._getInputValues();
        this._submitFunction(this._items);
        this.close();
    }

    setEventListeners() {
        this._popupSelector.addEventListener('submit', this._submit);
        super.setEventListeners();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

}

export default PopupWithForm;