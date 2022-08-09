import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
    constructor(popupSelector, functionToDo, configCard, buttonSelector) {
        super(popupSelector, configCard),
            this._buttonSelector = buttonSelector,
            this._functionToDo = functionToDo,
            this._button = this._popup.querySelector(this._buttonSelector);
    }

    data(id, card) {
        this._id = id;
        this._card = card;
    }

    _toDoFunction() {
        this._functionToDo(this._id, this._card);
        this.close()
    }

    setEventListeners() {
        this._button.addEventListener('click', this._toDoFunction.bind(this));
        super.setEventListeners();
    }

}

export default PopupWithConfirmation;