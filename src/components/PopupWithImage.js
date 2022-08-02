import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector, configCard) {
        super(popupSelector, configCard),
        this._popupImage = this._popup.querySelector(this._config.popupImage),
        this._popupCaption = this._popup.querySelector(this._config.popupCaption)
    }
    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupCaption.textContent = data.name;
        super.open();
    }

}

export default PopupWithImage;
 