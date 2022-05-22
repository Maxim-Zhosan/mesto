const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('.edit-form');
const formElement = document.querySelector('.edit-form__form');
const closeEditForm = document.querySelector('.edit-form__close-icon');
const editFormName = document.querySelector('.edit-form__input_type_name');
const editFormJob = document.querySelector('.edit-form__input_type_job');

function openPopup(popupElement) {
    editFormName.value = profileName.textContent
    editFormJob.value = profileDescription.textContent
    popupElement.classList.add('edit-form_type_open')
};

function closePopup(popupElement) {
    popupElement.classList.remove('edit-form_type_open')
};

function preventDef(event) {
    event.preventDefault()
}

function closeWithSave(popupElement) {
    profileName.textContent = editFormName.value
    profileDescription.textContent = editFormJob.value
    popupElement.classList.remove('edit-form_type_open')
};

// function detectClickOutside(event) {
//     if (event.target.classList.contains('edit-form')) {
//         openPopup(editForm)
//     }
// }

profileEditButton.addEventListener('click', () => openPopup(editForm));
closeEditForm.addEventListener('click', () => closePopup(editForm));
formElement.addEventListener('submit', () => {
    preventDef(event); 
    closeWithSave(editForm)
});

// document.body.addEventListener('click', function(event) {
//     detectClickOutside(event)});


