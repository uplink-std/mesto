import './pages/index.css';
import { Card, cardSelectors, popupSelectors, customEvents } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {PopupWithImage} from "./PopupWithImage";

const selectors = {
  profileNameInput: '.profile-form__name',
  profileOccupationInput: '.profile-form__occupation',
  profileInfoName: '.profile__info-name',
  profileInfoOccupation: '.profile__info-occupation',
  editButton: '.profile__edit-btn',
  addCardButton: '.profile__add-btn',
};

const formSelectors = {
  form: '.form',
  inputErrorClass: 'form__input_error',
  inputErrorMsgActiveClass: 'form__input-error-msg_active',
  saveButtonDisabledClass: 'form__save-btn_disabled',
  submitButton: '.form__save-btn',
}

const popupEditProfile = document.querySelector(popupSelectors.popupEditProfile);
const popupAddCard = document.querySelector(popupSelectors.popupAddCard);

const profileInfoName = document.querySelector(selectors.profileInfoName);
const profileInfoOccupation = document.querySelector(selectors.profileInfoOccupation);
const profileInfoEditButton = document.querySelector(selectors.editButton);

const editProfileForm = popupEditProfile.querySelector(formSelectors.form);
const profileFormNameInput = popupEditProfile.querySelector(selectors.profileNameInput);
const profileFormOccupationInput = popupEditProfile.querySelector(selectors.profileOccupationInput);

const cardAddButton = document.querySelector(selectors.addCardButton);
const cardsContainer = document.querySelector(cardSelectors.cardsContainer);
const cardForm = popupAddCard.querySelector(formSelectors.form);
const cardFormNameElement = popupAddCard.querySelector(cardSelectors.formName);
const cardFormPhotoElement = popupAddCard.querySelector(cardSelectors.formPhoto);

const popupViewCard = new PopupWithImage(popupSelectors.popupViewCard);
popupViewCard.setEventListeners();

const addCard = (cardElement, atStart = false) => {
  if (atStart) {
    cardsContainer.prepend(cardElement);
  } else {
    cardsContainer.append(cardElement);
  }
}

function openCardDetails(event) {
  popupViewCard.setImage(this._photo, this._name);
  popupViewCard.open();
}

const createCardElement = (data) => {
  const card = new Card(data, cardSelectors.template, openCardDetails);
  const element = card.generateDomElement();
  element.card = card;
  return element;
}

const addCards = (cards) => {
  cards.forEach( (card) => addCard( createCardElement(card) ) );
}

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

const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error-msg_active'
}

const forms = Array.from(document.querySelectorAll(validationOptions.formSelector));
forms.forEach( (form) => {
  const formValidator = new FormValidator(validationOptions, form);
  formValidator.enableValidation();
  form.validator = formValidator;
});

addCards( initialCards.map( (card) => {
  return {
    name: card.name,
    photo: card.link,
    photoDesc: card.name,
    liked: false
  }
}));