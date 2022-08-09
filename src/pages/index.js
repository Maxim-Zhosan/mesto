import "./index.css"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//ПЕРЕМЕННЫЕ

const configCard = {
    template: '.element-template',
    templateItem: '.elements__item',
    cardListSelector: '.elements',
    cardName: '.elements__place-name',
    cardImage: '.elements__image',
    cardDeleteButton: '.elements__delete-icon',
    cardLikeButton: '.elements__heart-icon',
    cardIsLiked: 'elements__heart-icon_liked',
    cardLikeNumber: '.elements__likes-number',
    cardPopup: '.popup_type_zoom',
    popup: 'popup',
    popupForm: '.popup__form',
    popupPlace: '.popup_type_place',
    popupAvatar: '.popup_type_avatar',
    popupIsOpened: 'popup_opened',
    popupImage: '.popup__image',
    popupCaption: '.popup__caption',
    popupCloseIcons: '.popup__close-icon',
    popupInput: '.popup__input',
    popupInputPlaceName: '.popup__input_type_place',
    popupInputPlaceLink: '.popup__input_type_link',
    popupProfile: '.popup_type_profile',
    profileNameInput: '.popup__input_type_name',
    profileJobInput: '.popup__input_type_job',
    profileAvatarInput: '.popup__input_type_avatar-link',
    profileName: '.profile__name',
    profileDescription: '.profile__description',
    profileEditButton: '.profile__edit-button',
    cardAddButton: '.profile__add-button',
    avatarEditButton: '.profile__avatar',
    popupFormProfile: '.popup__form_type_profile',
    popupFormNewCard: '.popup__form_type_new-card',
    popupFormNewAvatar: '.popup__form_type_new-avatar',
    popupDeleteCard: '.popup_type_delete-card'
}

const configValid = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const configServer = {
    host: 'https://nomoreparties.co/v1/cohort-47',
    token: '9157fd6e-3722-41c9-95ed-7f23b70d5928'
}

const profileEditButton = document.querySelector(configCard.profileEditButton);
const cardAddButton = document.querySelector(configCard.cardAddButton);
const avatarEditButton = document.querySelector(configCard.avatarEditButton);
const popupFormProfile = document.querySelector(configCard.popupFormProfile);
const popupFormNewCard = document.querySelector(configCard.popupFormNewCard);
const popupFormNewAvatar = document.querySelector(configCard.popupFormNewAvatar);
const profileNameInput = document.querySelector(configCard.profileNameInput);
const profileJobInput = document.querySelector(configCard.profileJobInput);
const profileAvatarInput = document.querySelector(configCard.profileAvatarInput);

//ФУНКЦИИ

//Валидация форм
const profileValidation = new FormValidator(configValid, popupFormProfile);
const newCardValidation = new FormValidator(configValid, popupFormNewCard);
const newAvatarValidation = new FormValidator(configValid, popupFormNewAvatar);
profileValidation.enableValidation();
newCardValidation.enableValidation();
newAvatarValidation.enableValidation();

//Создание попапа с изменением информации о профиле
const userInfoSelectors = {
    name: '.profile__name',
    about: '.profile__description',
    avatar: '.profile__avatar'
}

const api = new Api(configServer.host, configServer.token);
const section = new Section(createNew, configCard.cardListSelector);
const userInfo = new UserInfo(userInfoSelectors, configCard);
const popupUserInfo = new PopupWithForm(configCard.popupProfile, changeUserInfo, configCard);
popupUserInfo.setEventListeners();
const popupCard = new PopupWithForm(configCard.popupPlace, addCard, configCard);
popupCard.setEventListeners();
const popupAvatar = new PopupWithForm(configCard.popupAvatar, changeAvatar, configCard);
popupAvatar.setEventListeners();
const popupWithImage = new PopupWithImage(configCard.cardPopup, configCard);
popupWithImage.setEventListeners();
const popupDeleteCard = new PopupWithConfirmation(configCard.popupDeleteCard, deleteCard, configCard, configValid.submitButtonSelector);
popupDeleteCard.setEventListeners();


//Загрузка сайта
function addCardsFromServer() {
    Promise.all([
        api.getUserInformation(),
        api.getInitialCards()
    ])
        .then(([userData, items]) => {
            section.renderer(userData._id, items),
                userInfo.setUserInfo(userData),
                console.log(items),
                console.log(userData)
        })
        .catch((err) => console.log(err));
}
addCardsFromServer();

//Создание попапа с изображением
function handleCardClick(data) {
    popupWithImage.open(data);
};

//Открытие/Закрытие попапа профиля
function openProfilePopup() {
    profileValidation.resetValidation();
    const userData = userInfo.getUserInfo();
    profileNameInput.value = userData.name;
    profileJobInput.value = userData.about;
    popupUserInfo.open();
};

// Изменение информации о пользователе
function changeUserInfo(data) {
    return api.changeUserInformation(data)
        .then((res) => { userInfo.setUserInfo(res) })
        .catch((err) => console.log(err))
};

// Изменение аватара
function changeAvatar(data) {
    return api.changeAvatar(data)
        .then((res) => { userInfo.setUserInfo(res) })
        .catch((err) => console.log(err))
};

//Открытие/Закрытие попапа изменения аватара
function openNewAvatarPopup() {
    newAvatarValidation.resetValidation();
    const userData = userInfo.getUserInfo();
    profileAvatarInput.value = userData.avatar;
    popupAvatar.open();
};

//Открытие/Закрытие попапа добавления новой карточки
function openNewCardPopup() {
    newCardValidation.resetValidation();
    popupCard.open();
};

//Создание карточки
function createNew(userId, item) {
    const card = new Card(configCard, item, handleCardClick, handleCardDelete, userId, setLike);
    return card.createCard();
}

//Добавление новой карточки из формы
function addCard(item) {
    Promise.all([
        api.getUserInformation(),
        api.addNewCard(item)
    ])
        .then(([userData, item]) => {
            section.addItem(createNew(userData._id, item))
        })
        .catch((err) => console.log(err));
}

//Попап-удаления карточки
function handleCardDelete(id, card) {
    popupDeleteCard.data(id, card);
    popupDeleteCard.open();
}

//Удаление карточки
function deleteCard(id, card) {
    return api.deleteCardFromServer(id)
        .then(
            card.remove(),
            card = null
        )
        .catch((err) => console.log(err));
}
//Лайк 
function setLike(id, like) {
    if (like === true) {
        return api.deleteLike(id)
        .catch((err) => console.log(err));
    } else {
        return api.addLike(id)
        .catch((err) => console.log(err));
    }

}

//ОБРАБОТЧИКИ

profileEditButton.addEventListener('click', () => openProfilePopup());
cardAddButton.addEventListener('click', () => openNewCardPopup());
avatarEditButton.addEventListener('click', () => openNewAvatarPopup());
