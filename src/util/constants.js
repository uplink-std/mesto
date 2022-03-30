const popupSelectors = {
    popupCloseButton: '.popup__close-btn',
    popupOpenClass: 'popup_opened',
    popupEditProfile: '.popup_edit-profile',
    popupAddCard: '.popup_add-card',
    popupViewCard: '.popup_view-card',
    popupContainer: '.popup__container',
}

const userInfoSelectors = {
    nameSelector: '.profile__info-name',
    occupationSelector: '.profile__info-occupation',
    editButton: '.profile__edit-btn',
    addCardButton: '.profile__add-btn',
};

const validationOptions = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-btn',
    inactiveButtonClass: 'form__save-btn_disabled',
    inputErrorClass: 'form__input-error',
    errorClass: 'form__input-error-msg_active'
}

export { popupSelectors, userInfoSelectors, validationOptions };