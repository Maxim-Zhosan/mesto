class UserInfo {
    constructor(userInfoSelectors, configCard) {
            this._config = configCard,
            this._userName = document.querySelector(userInfoSelectors.profile),
            this._description = document.querySelector(userInfoSelectors.description),
            this._inputName = document.querySelector(this._config.profileNameInput),
            this._inputDescription = document.querySelector(this._config.profileJobInput)
    }

    setUserInfo(item) {
        this._userName.textContent = item.profileName;
        this._description.textContent = item.profileJob;
    }

    getUserInfo() {
        this._inputName.value = this._userName.textContent;
        this._inputDescription.value = this._description.textContent;
    }

}

export default UserInfo;