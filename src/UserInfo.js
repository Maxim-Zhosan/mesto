import Popup from "./Popup.js";

class UserInfo extends Popup {
    constructor(popupElement, configCard) {
        super(popupElement, configCard),
            this._element = popupElement,
            this._config = configCard
    }

    getUserInfo() {
        this._element.querySelector(this._config.profileNameInput).value = document.querySelector(this._config.profileName).textContent;
        this._element.querySelector(this._config.profileJobInput).value = document.querySelector(this._config.profileDescription).textContent;
    }

    setEventListeners() {
        this._submit = (event) => {
            event.preventDefault();
            this._setUserInfo();
        }
        this._element.addEventListener('submit', this._submit)
        super.setEventListeners();
    }

    _setUserInfo() {
        this._element.removeEventListener('submit', this._submit);
        document.querySelector(this._config.profileName).textContent = this._element.querySelector(this._config.profileNameInput).value;
        document.querySelector(this._config.profileDescription).textContent = this._element.querySelector(this._config.profileJobInput).value;
        super.close();
    }

}

export default UserInfo;