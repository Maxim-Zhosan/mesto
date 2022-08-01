import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector, configCard) {
        super(popupSelector, configCard)
    }
    open(data) {
        this._popupSelector.querySelector(this._config.popupImage).src = data.link;
        this._popupSelector.querySelector(this._config.popupImage).alt = data.name;
        this._popupSelector.querySelector(this._config.popupCaption).textContent = data.name;
        super.open();
    }

}

export default PopupWithImage;
 