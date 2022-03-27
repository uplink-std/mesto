import './pages/index.css';
import { Card, cardSelectors, popupSelectors } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {PopupWithImage} from "./PopupWithImage";
import {PopupWithForm} from "./PopupWithForm";
import {UserInfo} from "./UserInfo";

const selectors = {
  profileNameInput: '.profile-form__name',
  profileOccupationInput: '.profile-form__occupation',
  profileInfoName: '.profile__info-name',
  profileInfoOccupation: '.profile__info-occupation',
  editButton: '.profile__edit-btn',
  addCardButton: '.profile__add-btn',
};

const userInfoSelectors = {
  nameSelector: '.profile__info-name',
  occupationSelector: '.profile__info-occupation',
  editButton: '.profile__edit-btn',
  addCardButton: '.profile__add-btn',
};

const profileInfoEditButton = document.querySelector(selectors.editButton);
const cardAddButton = document.querySelector(selectors.addCardButton);
const cardsContainer = document.querySelector(cardSelectors.cardsContainer);

const addCard = (cardElement, atStart = false) => {
  if (atStart) {
    cardsContainer.prepend(cardElement);
  } else {
    cardsContainer.append(cardElement);
  }
}

function openCardDetails() {
  const image = this.getImage();
  popupViewCard.setImage(image.source, image.name);
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

const popupViewCard = new PopupWithImage(popupSelectors.popupViewCard);
popupViewCard.setEventListeners();

const userInfo = new UserInfo(userInfoSelectors);

const popupUserInfo = new PopupWithForm(popupSelectors.popupEditProfile, function handleSubmitProfile(e) {
  e.preventDefault();
  userInfo.setUserInfo( popupUserInfo.getValues() );
  popupUserInfo.close();
});

popupUserInfo.setEventListeners();

const popupAddCard = new PopupWithForm(popupSelectors.popupAddCard, function handleSubmitAddCard(e) {
  e.preventDefault();
  popupAddCard.getValues();
  console.log(`created card: ${JSON.stringify(popupAddCard.getValues())}`)
});
popupAddCard.setEventListeners();

profileInfoEditButton.addEventListener('click', function openUserInfoEditForm() {
  popupUserInfo.setValues( userInfo.getUserInfo() );
  popupUserInfo.open();
});

cardAddButton.addEventListener('click', function openAddCardForm() {
  popupAddCard.open();
});

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