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
};

const apiConfig = {
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
    token: "9198c67a-8234-4586-80bf-edb62ce0913e"
};

export { popupSelectors, userInfoSelectors, validationOptions, apiConfig };