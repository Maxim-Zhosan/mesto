class FormValidator {
    constructor(configValid, formElement) {
        this._config = configValid,
        this._formElement = formElement,
        this._inputList = this._formElement.querySelectorAll(this._config.inputSelector),
        this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector)
    }

    _setEventListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
            })
        }) 
            this._toggleButtonState();
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
        this._toggleButtonState();
    }

    _toggleButtonState() {
        if (!this._formElement.checkValidity()) {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.setAttribute("disabled", "");
        } else {
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.removeAttribute("disabled", "");
        }
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._config.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.errorClass);
    }

    resetValidation() {
        this._toggleButtonState(); 
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement) 
        });
      } 

    enableValidation() {
        this._setEventListeners();
    }
}

export default FormValidator;