import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(data, popupElement, configCard) {
        super(popupElement, configCard),
        this._image = data.link,
        this._description = data.name,
        this._caption = data.name,
        this._element = popupElement,
        this._config = configCard
    }
    open() {
        this._element.querySelector(this._config.popupImage).src = this._image;
        this._element.querySelector(this._config.popupImage).alt = this._description;
        this._element.querySelector(this._config.popupCaption).textContent = this._caption;
        super.open();
    }

}

export default PopupWithImage;
