const setEventListeners = (formElement, par) => {
    const inputList = Array.from(formElement.querySelectorAll(par.inputSelector));
    const buttonElement = formElement.querySelector(par.submitButtonSelector);
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement, par);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, par);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement, par);
        });
    });
};

const toggleButtonState = (inputList, buttonElement, par) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(par.inactiveButtonClass)
    }
    else {
        buttonElement.classList.remove(par.inactiveButtonClass)
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

const checkInputValidity = (formElement, inputElement, par) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, par);
    } else {
        hideInputError(formElement, inputElement, par);
    }
};

const showInputError = (formElement, inputElement, errorMessage, par) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(par.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(par.errorClass);
};

const hideInputError = (formElement, inputElement, par) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(par.inputErrorClass);
    errorElement.classList.remove(par.errorClass);
    errorElement.textContent = '';
};

function enableValidation(par) {
    const formList = Array.from(document.querySelectorAll(par.formSelector));
    formList.forEach((formElement) => setEventListeners(formElement, par));
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 

