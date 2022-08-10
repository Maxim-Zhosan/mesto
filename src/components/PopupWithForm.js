import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunction, configCard) {
        super(popupSelector, configCard),
        this._submitFunction = submitFunction,
        this._popupForm = this._popup.querySelector(configCard.popupForm),
        this._inputList = this._popupForm.querySelectorAll(this._config.popupInput),
        this._submitButton = this._popup.querySelector(configCard.submitButtonSelector)
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    _submit = (event) => {
        event.preventDefault();
        this._data = this._getInputValues();
        this.loading(true, "Сохранение...");
        this._submitFunction(this._data, this)
    }

    setEventListeners() {
        this._popup.addEventListener('submit', this._submit);
        super.setEventListeners();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    loading(status, buttonText) {
        if (status === true) {
            this._submitButton.textContent = buttonText;
            this._submitButton.setAttribute("disabled", "disabled");
        }
        else {
            this._submitButton.textContent = buttonText;
            this._submitButton.removeAttribute("disabled");
        }
    }

}

export default PopupWithForm;