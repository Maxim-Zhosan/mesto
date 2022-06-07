//Поп-ап редактирования информации профиля

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const editForm = document.querySelector('.edit-form');
const formElement = document.querySelector('.edit-form__form');
const closeEditForm = document.querySelector('.edit-form__close-icon');
const editFormName = document.querySelector('.edit-form__input_type_name');
const editFormJob = document.querySelector('.edit-form__input_type_job');

profileEditButton.addEventListener('click', () => openPopup(editForm));
closeEditForm.addEventListener('click', () => closePopup(editForm));
formElement.addEventListener('submit', () => formSubmitHandler(event));

function openPopup(popupElement) {
    editFormName.value = profileName.textContent;
    editFormJob.value = profileDescription.textContent;
    popupElement.classList.add('edit-form_opened');
};

function closePopup(popupElement) {
    popupElement.classList.remove('edit-form_opened');
};

function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = editFormName.value;
    profileDescription.textContent = editFormJob.value;
    closePopup(editForm);
};

//Поп-ап добавления карточки

const addForm = document.querySelector('.add-form');
const addFormElement = document.querySelector('.add-form__form');
const closeAddForm = document.querySelector('.add-form__close-icon');
const addFormName = document.querySelector('.add-form__input_type_name');
const addFormLink = document.querySelector('.add-form__input_type_link');

profileAddButton.addEventListener('click', () => openAddPopup(addForm));
closeAddForm.addEventListener('click', () => closeAddPopup(addForm));
addFormElement.addEventListener('submit', () => formAddSubmitHandler(event));

function openAddPopup(popupAddForm) {
    popupAddForm.classList.add('add-form_opened');
};

function closeAddPopup(popupAddForm) {
    popupAddForm.classList.remove('add-form_opened');
};

function formAddSubmitHandler(event) {
    event.preventDefault();
    const newElement = {name: addFormName.value, link: addFormLink.value};
    addElement(newElement);
    initialCards.push(newElement);
    closeAddPopup(addForm);
};

//Поп-ап изображения

const imageForm = document.querySelector('.photo-popup');
const closeImageForm = document.querySelector('.photo-popup__close-icon');
const imageElement = document.querySelector('.photo-popup__image');
const captionElement = document.querySelector('.photo-popup__caption');
closeImageForm.addEventListener('click', () => closeImagePopup(imageForm));

function openImagePopup(popupAddForm) {
    popupAddForm.classList.add('photo-popup_opened');
};

function closeImagePopup(popupAddForm) {
    popupAddForm.classList.remove('photo-popup_opened');
};

//Добавление карточек "из коробки"

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const elementTemplate = document.querySelector('.element-template');
const elementList = document.querySelector('.elements');
const getClosestItem = event => event.currentTarget.closest('.elements__item');
const likedUnliked = event => event.target.classList.toggle('elements__heart-icon_liked');

const createElement = object => {
    const elementContent = elementTemplate.content
        .querySelector('.elements__item')
        .cloneNode(true);
    elementContent.querySelector('.elements__place-name').textContent = object.name;
    elementContent.querySelector('.elements__image').src = object.link;
    elementContent.querySelector('.elements__image').alt = object.name;

//Удаление карточки
    elementContent.querySelector('.elements__delete-icon').addEventListener('click', event => {
        const elementItem = getClosestItem(event);
        elementItem.remove();
    });
//Лайк 
    elementContent.querySelector('.elements__heart-icon').addEventListener('click', event => {
        likedUnliked(event);
    });
//Создание поп-апа изображения
    elementContent.querySelector('.elements__image').addEventListener('click', event => {
        openImagePopup(imageForm);
        imageElement.src = object.link;
        imageElement.alt = elementContent.textContent;
        captionElement.textContent = elementContent.textContent;
    })
    return elementContent;
};

const addElement = object => {
    const cardInfo = createElement(object);
    elementList.prepend(cardInfo);
};

initialCards.forEach(addElement);
























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