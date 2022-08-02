class UserInfo {
    constructor(userInfoSelectors, configCard) {
            this._config = configCard,
            this._userName = document.querySelector(userInfoSelectors.profile),
            this._description = document.querySelector(userInfoSelectors.description)
    }

    setUserInfo(item) {
        this._userName.textContent = item.profileName;
        this._description.textContent = item.profileJob;
    }

    getUserInfo() {
        return { 
            profileName: this._userName.textContent, 
            profileJob: this._description.textContent, 
          }; 
    }

}

export default UserInfo;