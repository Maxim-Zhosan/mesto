import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//ПЕРЕМЕННЫЕ

const configCard = {
    template: '.element-template',
    cardList: '.elements',
    cardName: '.elements__place-name',
    cardImage: '.elements__image',
    cardDeleteButton: '.elements__delete-icon',
    cardLikeButton: '.elements__heart-icon',
    cardIsLiked: 'elements__heart-icon_liked',
    cardPopup: '.popup_type_zoom',
    popupIsOpend: '.popup_opened',
    popupImage: '.popup__image',
    popupCaption: '.popup__caption',
    popupCloseIcons: '.popup__close-icon'
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
const popupImage = document.querySelector(configCard.popupImage);
const popupCaption = document.querySelector(configCard.popupCaption);
const popupCloseIcons = document.querySelectorAll(configCard.popupCloseIcons);

const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const popupFormProfile = document.querySelector('.popup__form_type_profile');
const popupFormNewCard = document.querySelector('.popup__form_type_new-card');
const editFormName = document.querySelector('.popup__input_type_name');
const editFormJob = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addFormName = document.querySelector('.popup__input_type_place');
const addFormLink = document.querySelector('.popup__input_type_link');

//ФУНКЦИИ

//Открытие/Закрытие поп-апа
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', escCheck);
};

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', escCheck);
};

// - Закрытие поп-апа по нажатию на ESC
function escCheck(event) {
    const popupElementOpened = document.querySelector('.popup_opened');
    if (event.key === "Escape") {
        closePopup(popupElementOpened);
    }
};

// - Закрытие поп-апа по щелчку на крестик
const handleClosePopup = (event) => closePopup(event.target.closest('.popup'));

// - Закрытие поп-апа при щелке на оверлей
function detectClickOutside(event) {
    if (event.target.classList.contains('popup_opened')) {
        closePopup(event.target);
    }
};

//Открытие/Закрытие попапа профиля
function openProfilePopup(popupElement) {
    editFormName.value = profileName.textContent;
    editFormJob.value = profileDescription.textContent;
    openPopup(popupElement);
};

//Редактирование информации по профилю
function formSubmitProfileHandler(event) {
    event.preventDefault();
    profileName.textContent = editFormName.value;
    profileDescription.textContent = editFormJob.value;
    closePopup(popupProfile);
};

//Добавление новой карточки
function formSubmitNewCardHandler(event) {
    event.preventDefault();
    const newElement = { name: addFormName.value, link: addFormLink.value };
    const formButton = event.target.querySelector('.popup__button');
    formButton.classList.add('popup__button_disabled');
    addCard(newElement);
    popupFormNewCard.reset();
    closePopup(popupPlace);
};

//Наполнение поп-апа
function cardPopupData(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(cardPopup);
}

//Добавление карточки

function addCard(item) {
    const card = new Card(item, configCard, cardPopupData);
    document.querySelector(configCard.cardList)
        .prepend(card.createCard())
}

//Наполнение карточками из массива
initialCards.forEach(item => addCard(item));

//Валидация форм
const formList = document.querySelectorAll(configValid.formSelector);
formList.forEach(formElement => {
    const form = new FormValidator(configValid, formElement);
    form.enableValidation();
})


//ОБРАБОТЧИКИ

//Открытие/Закрытие попапа
profileEditButton.addEventListener('click', () => openProfilePopup(popupProfile));
cardAddButton.addEventListener('click', () => openPopup(popupPlace));
popupCloseIcons.forEach((event) => event.addEventListener('click', handleClosePopup));
document.addEventListener('mousedown', (event) => detectClickOutside(event));

//Редактирование информации по профилю
popupFormProfile.addEventListener('submit', formSubmitProfileHandler);

//Добавление новой карточки
popupFormNewCard.addEventListener('submit', formSubmitNewCardHandler);

















// ДО РЕФАКТОРИНГА

// //ПЕРЕМЕННЫЕ

// const elementTemplate = document.querySelector('.element-template');
// const elementList = document.querySelector('.elements');
// const popup = document.querySelector('.popup');
// const popupProfile = document.querySelector('.popup_type_profile');
// const popupPlace = document.querySelector('.popup_type_place');
// const popupZoom = document.querySelector('.popup_type_zoom');
// const profileEditButton = document.querySelector('.profile__edit-button');
// const cardAddButton = document.querySelector('.profile__add-button');
// const ElementsImage = document.querySelector('.elements__image');
// const popupImage = document.querySelector('.popup__image');
// const popupCaption = document.querySelector('.popup__caption');
// const popupCloseIcons = document.querySelectorAll('.popup__close-icon');
// const popupFormProfile = document.querySelector('.popup__form_type_profile');
// const popupFormNewCard = document.querySelector('.popup__form_type_new-card');
// const editFormName = document.querySelector('.popup__input_type_name');
// const editFormJob = document.querySelector('.popup__input_type_job');
// const profileName = document.querySelector('.profile__name');
// const profileDescription = document.querySelector('.profile__description');
// const addFormName = document.querySelector('.popup__input_type_place');
// const addFormLink = document.querySelector('.popup__input_type_link');

// //ФУНКЦИИ

// //Открытие/Закрытие попапа
// function openProfilePopup(popupElement) {
//     editFormName.value = profileName.textContent;
//     editFormJob.value = profileDescription.textContent;
//     openPopup(popupElement);
// };

// function openPopup(popupElement) {
//     popupElement.classList.add('popup_opened');
//     document.addEventListener('keydown', escCheck);
// };

// function closePopup(popupElement) {
//     popupElement.classList.remove('popup_opened');
//     document.removeEventListener('keydown', escCheck);
// };

// function escCheck(event) {
//     const popupElementOpened = document.querySelector('.popup_opened');
//     if (event.key === "Escape") {
//         closePopup(popupElementOpened);
//     }
// };

// // Закрытие поп-апа по щелчку на крестик

// const handleClosePopup = (event) => closePopup(event.target.closest('.popup'));

// // Закрытие поп-апа при щелке на оверлей

// function detectClickOutside(event) {
//     if (event.target.classList.contains('popup_opened')) {
//         closePopup(event.target);
//     }
// };

// //Редактирование информации по профилю
// function formSubmitProfileHandler(event) {
//     event.preventDefault();
//     profileName.textContent = editFormName.value;
//     profileDescription.textContent = editFormJob.value;
//     closePopup(popupProfile);
// };

// //Добавление новой карточки
// function formSubmitNewCardHandler(event) {
//     event.preventDefault();
//     const newElement = {name: addFormName.value, link: addFormLink.value};
//     const formButton = event.target.querySelector('.popup__button');
//     formButton.classList.add('popup__button_disabled');
//     addElement(newElement);
//     popupFormNewCard.reset();
//     closePopup(popupPlace);
// };

// //Добавление карточек "из коробки"
// const createElement = object => {
//     const elementContent = elementTemplate.content
//         .querySelector('.elements__item')
//         .cloneNode(true);
//     elementContent.querySelector('.elements__place-name').textContent = object.name;
//     const elementImage = elementContent.querySelector('.elements__image');
//     elementImage.src = object.link;
//     elementImage.alt = object.name;
//     //Удаление карточки
//     const handleDeleteCard = event => {
//         const elementItem = getClosestItem(event);
//         elementItem.remove();
//     };
//     const getClosestItem = event => event.currentTarget.closest('.elements__item');
//     elementContent.querySelector('.elements__delete-icon').addEventListener('click', handleDeleteCard);
//     //Лайк 
//     const handleLikeClick = event => event.target.classList.toggle('elements__heart-icon_liked');
//     elementContent.querySelector('.elements__heart-icon').addEventListener('click', event => handleLikeClick(event));
//     //Создание поп-апа изображения
//     elementContent.querySelector('.elements__image').addEventListener('click', event => {
//         popupImage.src = object.link;
//         popupImage.alt = object.name;
//         popupCaption.textContent = object.name;
//         openPopup(popupZoom);
//     })
//     return elementContent;
// };

// const addElement = (object) => {
//     const cardInfo = createElement(object);
//     elementList.prepend(cardInfo);
// };

// initialCards.forEach(addElement);

// //ОБРАБОТЧИКИ

// //Открытие/Закрытие попапа
// profileEditButton.addEventListener('click', () => openProfilePopup(popupProfile));
// cardAddButton.addEventListener('click', () => openPopup(popupPlace));
// popupCloseIcons.forEach((event) => event.addEventListener('click', handleClosePopup));
// document.addEventListener('mousedown', (event) => detectClickOutside(event));


// //Редактирование информации по профилю
// popupFormProfile.addEventListener('submit', formSubmitProfileHandler);

// //Добавление новой карточки
// popupFormNewCard.addEventListener('submit', formSubmitNewCardHandler);