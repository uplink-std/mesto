import './index.css';
import { Card, cardSelectors } from "../Card.js";
import { FormValidator } from "../FormValidator.js";
import {PopupWithImage} from "../PopupWithImage";
import {PopupWithForm} from "../PopupWithForm";
import {UserInfo} from "../UserInfo";
import {Section} from "../Section";

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

const userInfoValidator = new FormValidator(validationOptions, document.forms['profile']);
userInfoValidator.enableValidation();

const addCardValidator = new FormValidator(validationOptions, document.forms['card']);
addCardValidator.enableValidation();

const profileInfoEditButton = document.querySelector(userInfoSelectors.editButton);
const cardAddButton = document.querySelector(userInfoSelectors.addCardButton);

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

window.initialCards = initialCards;

function renderCard(item) {
  const element = createCardElement(item);
  cardsContainer.addItem(element);
}

const mapInitialCards = (initialsCards) => {
  return initialsCards.map( card => {
    return {
      name: card.name,
      photo: card.link,
      photoDesc: card.name,
      liked: false
    }
  }).reverse();
}

const cardsContainer = new Section(
  {
    items: mapInitialCards(initialCards),
    renderer: renderCard
  },
  cardSelectors.cardsContainer
);

cardsContainer.renderItems();

const popupViewCard = new PopupWithImage(popupSelectors.popupViewCard);
popupViewCard.setEventListeners();

const userInfo = new UserInfo(userInfoSelectors);

function handleSubmitProfile(e) {
  e.preventDefault();
  userInfo.setUserInfo( popupUserInfo.getValues() );
  popupUserInfo.close();
}

const popupUserInfo = new PopupWithForm(popupSelectors.popupEditProfile, handleSubmitProfile);

popupUserInfo.setEventListeners();

const mapFormCard = (values) => {
  return {
    name: values.name,
    photo: values.photo,
    photoDesc: values.name,
    liked: false
  }
}

function handleSubmitAddCard(e) {
  e.preventDefault();
  const cardData = mapFormCard(popupAddCard.getValues());
  cardsContainer.addItem(createCardElement(cardData));
  popupAddCard.close();
}

const popupAddCard = new PopupWithForm(popupSelectors.popupAddCard, handleSubmitAddCard);
popupAddCard.setEventListeners();

function openUserInfoEditForm() {
  popupUserInfo.setValues( userInfo.getUserInfo() );
  userInfoValidator.validateForm();
  popupUserInfo.open();
}

profileInfoEditButton.addEventListener('click', openUserInfoEditForm);

function openAddCardForm() {
  popupAddCard.reset();
  addCardValidator.hideFormErrorMessages();
  popupAddCard.open();
}

cardAddButton.addEventListener('click', openAddCardForm);
