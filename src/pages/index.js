import './index.css';
import { popupSelectors, userInfoSelectors, validationOptions } from "../util/constants.js"
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage";
import {PopupWithForm} from "../components/PopupWithForm";
import {UserInfo} from "../components/UserInfo";
import {Section} from "../components/Section";


function createFormValidator(name) {
  const validator = new FormValidator(validationOptions, document.forms[name]);
  validator.enableValidation();
  return validator;
}

const userInfoValidator = createFormValidator('profile');
const cardFormValidator = createFormValidator('card');

const profileInfoEditButton = document.querySelector(userInfoSelectors.editButton);
const cardAddButton = document.querySelector(userInfoSelectors.addCardButton);

function openCardDetails( image ) {
  popupViewCard.open( image );
}

function createCardElement(data) {
  const card = new Card(data, '#element-template', openCardDetails);
  return card.generateDomElement();
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

function renderCard(item) {
  const element = createCardElement(item);
  cardsContainer.addItem(element);
}

const cardsContainer = new Section(
  {
    items: initialCards,
    renderer: renderCard
  },
  '.elements__list'
);

cardsContainer.renderItems();

const popupViewCard = new PopupWithImage(popupSelectors.popupViewCard);
popupViewCard.setEventListeners();

const userInfo = new UserInfo(userInfoSelectors);

function handleSubmitProfile(userData) {
  userInfo.setUserInfo( userData );
}

const popupUserInfo = new PopupWithForm(popupSelectors.popupEditProfile, handleSubmitProfile);
popupUserInfo.setEventListeners();

function handleSubmitAddCard(cardData) {
  cardsContainer.addItem(createCardElement(cardData));
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
  cardFormValidator.validateForm();
  cardFormValidator.hideFormErrorMessages();
  popupAddCard.open();
}

cardAddButton.addEventListener('click', openAddCardForm);
