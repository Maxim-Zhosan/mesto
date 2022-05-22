const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('.edit-form');
const formElement = document.querySelector('.edit-form__form');
const closeEditForm = document.querySelector('.edit-form__close-icon');
const editFormName = document.querySelector('.edit-form__input_type_name');
const editFormJob = document.querySelector('.edit-form__input_type_job');

function openClosePopup(popupElement) {
    editFormName.value = profileName.textContent
    editFormJob.value = profileDescription.textContent
    popupElement.classList.toggle('edit-form_isOpen')
};

function closeWithSave(popupElement) {
    profileName.textContent = editFormName.value
    profileDescription.textContent = editFormJob.value
    popupElement.classList.toggle('edit-form_isOpen')
};

function detectClickOutside(event) {
    if (event.target.classList.contains('edit-form')) {
        openClosePopup(editForm)
    }
}

profileEditButton.addEventListener('click', () => openClosePopup(editForm));
closeEditForm.addEventListener('click', () => closeWithSave(editForm));
formElement.addEventListener('submit', function(event) {
    event.preventDefault()
    closeWithSave(editForm)
});
document.body.addEventListener('click', function(event) {
    detectClickOutside(event)});


