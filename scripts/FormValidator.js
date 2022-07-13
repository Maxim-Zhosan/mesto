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
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement)
            this._submitButton.classList.add(this._config.inactiveButtonClass)
        } else {
            this._hideInputError(inputElement);
            this._submitButton.classList.remove(this._config.inactiveButtonClass)
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

    enableValidation() {
        this._setEventListeners();
    }
}

export default FormValidator;



// const setEventListeners = (formElement, par) => {
//     const inputList = Array.from(formElement.querySelectorAll(par.inputSelector));
//     const buttonElement = formElement.querySelector(par.submitButtonSelector);
//     // чтобы проверить состояние кнопки в самом начале
//     toggleButtonState(inputList, buttonElement, par);

//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener('input', function () {
//             checkInputValidity(formElement, inputElement, par);
//             // чтобы проверять его при изменении любого из полей
//             toggleButtonState(inputList, buttonElement, par);
//         });
//     });
// };

// const toggleButtonState = (inputList, buttonElement, par) => {
//     if (hasInvalidInput(inputList)) {
//         buttonElement.classList.add(par.inactiveButtonClass)
//     }
//     else {
//         buttonElement.classList.remove(par.inactiveButtonClass)
//     }
// }

// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid
//     })
// }

// const checkInputValidity = (formElement, inputElement, par) => {
//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage, par);
//     } else {
//         hideInputError(formElement, inputElement, par);
//     }
// };

// const showInputError = (formElement, inputElement, errorMessage, par) => {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     inputElement.classList.add(par.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(par.errorClass);
// };

// const hideInputError = (formElement, inputElement, par) => {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     inputElement.classList.remove(par.inputErrorClass);
//     errorElement.classList.remove(par.errorClass);
//     errorElement.textContent = '';
// };
















//ДО РЕФАКТОРИНГА

// const setEventListeners = (formElement, par) => {
//     const inputList = Array.from(formElement.querySelectorAll(par.inputSelector));
//     const buttonElement = formElement.querySelector(par.submitButtonSelector);
//     // чтобы проверить состояние кнопки в самом начале
//     toggleButtonState(inputList, buttonElement, par);

//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener('input', function () {
//             checkInputValidity(formElement, inputElement, par);
//             // чтобы проверять его при изменении любого из полей
//             toggleButtonState(inputList, buttonElement, par);
//         });
//     });
// };

// const toggleButtonState = (inputList, buttonElement, par) => {
//     if (hasInvalidInput(inputList)) {
//         buttonElement.classList.add(par.inactiveButtonClass)
//     }
//     else {
//         buttonElement.classList.remove(par.inactiveButtonClass)
//     }
// }

// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid
//     })
// }

// const checkInputValidity = (formElement, inputElement, par) => {
//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage, par);
//     } else {
//         hideInputError(formElement, inputElement, par);
//     }
// };

// const showInputError = (formElement, inputElement, errorMessage, par) => {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     inputElement.classList.add(par.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(par.errorClass);
// };

// const hideInputError = (formElement, inputElement, par) => {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     inputElement.classList.remove(par.inputErrorClass);
//     errorElement.classList.remove(par.errorClass);
//     errorElement.textContent = '';
// };

// function enableValidation(par) {
//     const formList = Array.from(document.querySelectorAll(par.formSelector));
//     formList.forEach((formElement) => setEventListeners(formElement, par));
// };

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   }); 