import "../pages/index.css"
import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

//ПЕРЕМЕННЫЕ

const configCard = {
    template: '.element-template',
    templateItem: '.elements__item',
    cardList: '.elements',
    cardName: '.elements__place-name',
    cardImage: '.elements__image',
    cardDeleteButton: '.elements__delete-icon',
    cardLikeButton: '.elements__heart-icon',
    cardIsLiked: 'elements__heart-icon_liked',
    cardPopup: '.popup_type_zoom',
    popup: 'popup',
    popupPlace: '.popup_type_place',
    popupIsOpened: 'popup_opened',
    popupImage: '.popup__image',
    popupCaption: '.popup__caption',
    popupCloseIcons: '.popup__close-icon',
    popupInputPlaceName: '.popup__input_type_place',
    popupInputPlaceLink: '.popup__input_type_link',
    popupProfile: '.popup_type_profile',
    profileNameInput: '.popup__input_type_name',
    profileJobInput: '.popup__input_type_job',
    profileName: '.profile__name',
    profileDescription: '.profile__description',
    profileEditButton: '.profile__edit-button',
    cardAddButton: '.profile__add-button',
    popupFormProfile: '.popup__form_type_profile',
    popupFormNewCard: '.popup__form_type_new-card'
}

const configValid = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const cardPopup = document.querySelector(configCard.cardPopup);
const popupPlace = document.querySelector(configCard.popupPlace);
const cardList = document.querySelector(configCard.cardList);
const popupProfile = document.querySelector(configCard.popupProfile);
const profileEditButton = document.querySelector(configCard.profileEditButton);
const cardAddButton = document.querySelector(configCard.cardAddButton);
const popupFormProfile = document.querySelector(configCard.popupFormProfile);
const popupFormNewCard = document.querySelector(configCard.popupFormNewCard);

//ФУНКЦИИ

//Валидация форм
const profileValidation = new FormValidator(configValid, popupFormProfile);
const newCardValidation = new FormValidator(configValid, popupFormNewCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();  

//Открытие/Закрытие попапа профиля
const popup = new UserInfo (popupProfile, configCard);
function openProfilePopup() {
    profileValidation.resetValidation();
    popup.getUserInfo();
    popup.open();
};

//Создание попапа с изображением
function handleCardClick(data) {
    const popup = new PopupWithImage(data, cardPopup, configCard);
    popup.open();
};

//Создание карточки
const card = new Card(configCard, handleCardClick);
const newCard = (item) => {
return card.createCard(item);
}

//Добавление карточек из коробки
const initialObjects = {
    items: initialCards,
    renderer: newCard
}
const section = new Section(initialObjects, cardList);
section.renderer();

const popupCard = new PopupWithForm (popupPlace, addCard, configCard);

//Открытие/Закрытие попапа карточки
function openNewCardPopup() {
    newCardValidation.resetValidation();
    popupCard.open();

};

//Добавление новой карточки из формы
function addCard(item){
    section.addItem(newCard(item));
}

//ОБРАБОТЧИКИ

profileEditButton.addEventListener('click', () => openProfilePopup());
cardAddButton.addEventListener('click', () => openNewCardPopup());
