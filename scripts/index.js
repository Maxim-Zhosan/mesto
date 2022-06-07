//ПЕРЕМЕННЫЕ

const elementTemplate = document.querySelector('.element-template');
const elementList = document.querySelector('.elements');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupZoom = document.querySelector('.popup_type_zoom');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption');
const popupCloseIcon = document.querySelectorAll('.popup__close-icon');
const popupFormProfile = document.querySelector('.popup__form_type_profile');
const popupFormNewCard = document.querySelector('.popup__form_type_new-card');
const editFormName = document.querySelector('.popup__input_type_name');
const editFormJob = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addFormName = document.querySelector('.popup__input_type_place');
const addFormLink = document.querySelector('.popup__input_type_link');

//ФУНКЦИИ

//Открытие/Закрытие попапа
function openProfilePopup(popupElement) {
    editFormName.value = profileName.textContent;
    editFormJob.value = profileDescription.textContent;
    popupElement.classList.add('popup_opened');
};

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
};

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}
const handleClosePopup = (event) => closePopup(event.currentTarget.closest('.popup'));

//Редактирование информации по профилю
function formSubmitProfileHandler(event) {
    event.preventDefault();
    profileName.textContent = editFormName.value;
    profileDescription.textContent = editFormJob.value;
    popupFormProfile.reset();
    handleClosePopup(event);
};

//Добавление новой карточки
function formSubmitNewCardHandler(event) {
    event.preventDefault();
    const newElement = {name: addFormName.value, link: addFormLink.value};
    addElement(newElement);
    popupFormNewCard.reset();
    handleClosePopup(event);
};

//Добавление карточек "из коробки"
const createElement = object => {
    const elementContent = elementTemplate.content
        .querySelector('.elements__item')
        .cloneNode(true);
    elementContent.querySelector('.elements__place-name').textContent = object.name;
    elementContent.querySelector('.elements__image').src = object.link;
    elementContent.querySelector('.elements__image').alt = object.name;
    //Удаление карточки
    const handleDeleteCard = event => {
        const elementItem = getClosestItem(event);
        elementItem.remove();
    };
    const getClosestItem = event => event.currentTarget.closest('.elements__item');
    elementContent.querySelector('.elements__delete-icon').addEventListener('click', handleDeleteCard);
    //Лайк 
    const handleLikeClick = event => event.target.classList.toggle('elements__heart-icon_liked');
    elementContent.querySelector('.elements__heart-icon').addEventListener('click', event => handleLikeClick(event));
    //Создание поп-апа изображения
    elementContent.querySelector('.elements__image').addEventListener('click', event => {
        popupImage.src = object.link;
        popupImage.alt = object.name;
        popupCaption.textContent = object.name;
        openPopup(popupZoom);
    })
    return elementContent;
};

const addElement = (object) => {
    const cardInfo = createElement(object);
    elementList.prepend(cardInfo);
};

initialCards.forEach(addElement);

//ОБРАБОТЧИКИ

//Открытие/Закрытие попапа
profileEditButton.addEventListener('click', () => openProfilePopup(popupProfile));
cardAddButton.addEventListener('click', () => openPopup(popupPlace));
popupImage.addEventListener('click', () => openPopup(popupZoom));
popupCloseIcon.forEach((event) => event.addEventListener('click', handleClosePopup));

//Редактирование информации по профилю
popupFormProfile.addEventListener('submit', () => formSubmitProfileHandler(event));

//Добавление новой карточки
popupFormNewCard.addEventListener('submit', () => formSubmitNewCardHandler(event));






//Лайк

// document.body.addEventListener('click', (event) => likedIcon(event));
// function likedIcon(event) {
//     if (event.target.classList.contains('elements__heart-icon')) {
//     event.target.classList.toggle('elements__heart-icon_liked');
//     }
// }

//Удаление карточки
 
// document.body.addEventListener('click', (event) => deleteIcon(event));
// function deleteIcon(event) {
//     if (event.target.classList.contains('elements__delete-icon')) {
//     const elementItem = event.target.closest('.elements__item');
//     elementItem.remove()
//     }
// }

// Закртыие поп-апа при щелке на оверлей

// function detectClickOutside(event) {
//     if (event.target.classList.contains('edit-form')) {
//         closePopup(editForm)
//     }
// }

// document.body.addEventListener('click', function(event) {
//     detectClickOutside(event)});