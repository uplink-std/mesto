import './index.css';
import {apiConfig, popupSelectors, userInfoSelectors, validationOptions} from "../util/constants.js"
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Section} from "../components/Section.js";
import { RestClient } from "../components/RestClient.js";
import { Api } from "../components/Api.js";

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

function renderCard(item) {
  const element = createCardElement(item);
  cardsContainer.addItem(element);
}

const cardsContainer = new Section(
  {
    items: [],
    renderer: renderCard
  },
  '.elements__list'
);
cardsContainer.renderItems();

const popupViewCard = new PopupWithImage(popupSelectors.popupViewCard);
popupViewCard.setEventListeners();

const userInfo = new UserInfo(userInfoSelectors);

function handleSubmitProfile(userData) {
    api.updateUserInfo({ name: userData.name, about: userData.occupation })
        .then( user => userInfo.setUserInfo({ name: user.name, occupation: user.about }))
        .catch( error => console.log(error));
}

const popupUserInfo = new PopupWithForm(popupSelectors.popupEditProfile, handleSubmitProfile);
popupUserInfo.setEventListeners();

function handleSubmitAddCard(cardData) {
    api.createCard(cardData)
        .then( card => {
            cardsContainer.addItem(createCardElement(card));
        })
        .catch( error => console.log(error));
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

const restClient = new RestClient(apiConfig);
const api = new Api(restClient);

Promise.all([
    api.getUserInfo(),
    api.getCards()
]).then( ([user, cards]) => {
    userInfo.setUserInfo({ ...user, occupation: user.about });
    cards.reverse().forEach(card => renderCard(card));
}).catch(error => console.log(error));

