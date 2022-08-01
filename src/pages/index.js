import "./index.css"
import initialCards from "../components/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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
    cardPopup: '.popup_type_zoom',
    popup: 'popup',
    popupForm: '.popup__form',
    popupPlace: '.popup_type_place',
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
const cardListSelector = document.querySelector(configCard.cardListSelector);
const popupProfile = document.querySelector(configCard.popupProfile);
const profileName = document.querySelector(configCard.profileName);
const profileDescription = document.querySelector(configCard.profileDescription);
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
const userInfoSelectors = {
    profile: profileName,
    description: profileDescription
}
const popupUserInfo = new UserInfo (userInfoSelectors, popupProfile, configCard);
popupUserInfo.setEventListeners();

function openProfilePopup() {
    profileValidation.resetValidation();
    popupUserInfo.setUserInfo();
    popupUserInfo.open();
};

//Создание попапа с изображением
const popupWithImage = new PopupWithImage(cardPopup, configCard);
popupWithImage.setEventListeners();

function handleCardClick(data) {
    popupWithImage.open(data);
};

//Создание карточки
function createNew(item) {
const card = new Card(configCard, item, handleCardClick);
return card.createCard();
}
 
//Добавление карточек из коробки
const initialObjects = {
    items: initialCards,
    renderer: createNew
}
const section = new Section(initialObjects, cardListSelector);
section.renderer();

const popupCard = new PopupWithForm (popupPlace, addCard, configCard);
popupCard.setEventListeners();

//Открытие/Закрытие попапа карточки
function openNewCardPopup() {
    newCardValidation.resetValidation();
    popupCard.open();
};

//Добавление новой карточки из формы
function addCard(item){
    section.addItem(createNew(item)); 
}

//ОБРАБОТЧИКИ

profileEditButton.addEventListener('click', () => openProfilePopup());
cardAddButton.addEventListener('click', () => openNewCardPopup());
