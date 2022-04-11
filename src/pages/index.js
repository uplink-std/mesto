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
const avatarFormValidator = createFormValidator('avatar');

const profileInfoEditButton = document.querySelector(userInfoSelectors.editButton);
const cardAddButton = document.querySelector(userInfoSelectors.addCardButton);

function openCardDetails( image ) {
  popupViewCard.open( image );
}

function deleteCard(cardId, cardElement) {
  // open confirm popup
  api.deleteCard(cardId)
    .then( (result) => {
      console.log(result.message);
      cardElement.remove();
    })
    .catch(error => console.log(error))
    .finally( () => {
      // close confirm popup
    });
}

function likeCard(hasUserLike, cardId, card) {
  api.setLike( !hasUserLike, cardId )
    .then( result => {
      card.updateLikes(result.likes);
    })
    .catch(error => console.log(error));
}

function createCardElement(data) {
    const card = new Card(userInfo.getUserInfo().id, data, '#element-template', openCardDetails, deleteCard, likeCard);
    return card.generateDomElement();
}

const cardsContainer = new Section(
  { renderer: createCardElement },
  '.elements__list'
);

const popupViewCard = new PopupWithImage(popupSelectors.popupViewCard);
popupViewCard.setEventListeners();

function handleSubmitAvatar(formData) {
  api.updateUserAvatar(formData.avatar)
    .then(userData => {
      userInfo.setUserInfo(userData);
    })
    .catch(error => console.log(error))
    .finally(() => popupAvatarForm.close());
}

const popupAvatarForm = new PopupWithForm(popupSelectors.popupEditAvatar, handleSubmitAvatar);
popupAvatarForm.setEventListeners();

function openAvatarEdit(avatarUrl) {
  popupAvatarForm.setValues({ avatar: avatarUrl });
  avatarFormValidator.validateForm();
  popupAvatarForm.open();
}

const userInfo = new UserInfo(userInfoSelectors, openAvatarEdit);

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
          cardsContainer.addItem( createCardElement(card) )
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
    cardsContainer.renderItems(cards.reverse());
}).catch(error => console.log(error));

