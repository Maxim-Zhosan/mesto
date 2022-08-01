class UserInfo {
    constructor(userInfoSelectors, popupSelector, configCard) {
            this._element = popupSelector,
            this._config = configCard,
            this._userName = userInfoSelectors.profile,
            this._description = userInfoSelectors.description,
            this._inputName = this._element.querySelector(this._config.profileNameInput),
            this._inputDescription = this._element.querySelector(this._config.profileJobInput)
    }

    setUserInfo() {
        this._inputName.value =  this._userName.textContent;
        this._inputDescription.value = this._description.textContent;
    }

    open() {
        this._element.classList.add(this._config.popupIsOpened);
        document.addEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close();
        }
    }

    _handleOutsideClick(event) {
        if (event.target.classList.contains(this._config.popup)) {
            this.close(); 
        }
    }

    close() {
        this._element.classList.remove(this._config.popupIsOpened);
        document.removeEventListener('keydown', this._handleEscClose);
    } 

    getUserInfo() {
        this._userName.textContent =  this._inputName.value;
        this._description.textContent = this._inputDescription.value;
    }

    _submit = (event) => {
        event.preventDefault();
        this.getUserInfo();
        this.close();
    }

    setEventListeners() {
        this._element.addEventListener('submit', this._submit)
        this._closeButton = this._element.querySelector(this._config.popupCloseIcons);
        this._closeButton.addEventListener('click', this.close.bind(this));
        this._element.addEventListener('mousedown', this._handleOutsideClick.bind(this));
    } 

}

export default UserInfo;