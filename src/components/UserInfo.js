class UserInfo {
    constructor(userInfoSelectors, configCard) {
            this._config = configCard,
            this._name = document.querySelector(userInfoSelectors.name),
            this._about = document.querySelector(userInfoSelectors.about),
            this._avatar = document.querySelector(userInfoSelectors.avatar)
    }

    setUserInfo(result) {
        this._name.textContent = result.name;
        this._about.textContent = result.about;
        this._avatarLink = result.avatar;
        this._avatar.style = `background-image: url(${result.avatar})`;
        this._id = result._id;
    }

    getUserInfo() {
        return { 
            name: this._name.textContent, 
            about: this._about.textContent,
            avatar: this._avatarLink
          }; 
    }

    checkUserId() {
        return this._id;
    }
}

export default UserInfo;