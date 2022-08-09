class Api {
    constructor(host, token) {
        this._host = host,
            this._token = token
    }

    _getJsonOrError(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._host}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._getJsonOrError(res))
    }

    changeUserInformation(data) {
        return fetch(`${this._host}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._getJsonOrError(res))
    }

    changeAvatar(data) {
        return fetch(`${this._host}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => this._getJsonOrError(res))
    }

    getUserInformation() {
        return fetch(`${this._host}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._getJsonOrError(res))
    }

    addNewCard(place) {
        return fetch(`${this._host}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: place.name,
                link: place.link,
            })
        })
            .then(res => this._getJsonOrError(res))
    }

    deleteCardFromServer(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-47/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._getJsonOrError(res))
    }

    addLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-47/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._getJsonOrError(res))
    }

    deleteLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-47/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._getJsonOrError(res))
    }
};

export default Api;