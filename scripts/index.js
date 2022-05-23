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
    popupElement.classList.add('edit-form_opened')
};

function closePopup(popupElement) {
    popupElement.classList.remove('edit-form_opened')
};

function formSubmitHandler(event) {
    event.preventDefault()
    profileName.textContent = editFormName.value
    profileDescription.textContent = editFormJob.value
    closePopup(editForm)
}

profileEditButton.addEventListener('click', () => openPopup(editForm));
closeEditForm.addEventListener('click', () => closePopup(editForm));
formElement.addEventListener('submit', () => formSubmitHandler(event));

// function detectClickOutside(event) {
//     if (event.target.classList.contains('edit-form')) {
//         closePopup(editForm)
//     }
// }

// document.body.addEventListener('click', function(event) {
//     detectClickOutside(event)});


