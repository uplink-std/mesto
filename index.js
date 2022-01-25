/* 1. Нужно найти все используемые переменные */

const SELECTORS = {
  page: '.page',
  popup: '.popup',
  popupOpenClass: 'popup_opened',
  form: '.profile-form',
  nameInput: '.profile-form__name',
  occupationInput: '.profile-form__occupation',
  closeButton: '.profile-form__close-btn',
  name: '.profile__info-name',
  occupation: '.profile__info-occupation',
  avatar: '.profile__avatar',
  editButton: '.profile__edit-btn',
  addButton: '.profile__add-btn',
};

const profileName = document.querySelector(SELECTORS.name);
const profileOccupation = document.querySelector(SELECTORS.occupation);
const popupElement = document.querySelector(SELECTORS.popup);
const formElement = document.querySelector(SELECTORS.form);
const nameInput = formElement.querySelector(SELECTORS.nameInput);
const occupationInput = formElement.querySelector(SELECTORS.occupationInput);
const closeButton = formElement.querySelector(SELECTORS.closeButton);
const editButton = document.querySelector(SELECTORS.editButton);

/* 2. Описать функции открытия попапа, закрытия попапа и сабмита формы  */

const openPopup = () => {
  popupElement.classList.add(SELECTORS.popupOpenClass);
}

const setFormProfile = () => {
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
}

const closePopup = () => {
  popupElement.classList.remove(SELECTORS.popupOpenClass);
}

const saveProfile = (e) => {
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
}

/* 3. Повесить обработчики на кнопки открытия попапа редактирования профиля, нажатие на крестик, сабмит формы */

closeButton.addEventListener( 'click', closePopup );

editButton.addEventListener( 'click', () => {
  setFormProfile();
  openPopup();
});

formElement.addEventListener( 'submit', (e) => {
    e.preventDefault();
    saveProfile();
    closePopup();
  }
);
