import './index.css';
import {apiConfig, popupSelectors, userInfoSelectors, validationOptions} from "../util/constants.js"
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Section} from "../components/Section.js";
import {Api} from "../components/Api.js";
import {PopupWithConfirmDialog} from "../components/PopupWithConfirmDialog";

const api = new Api(apiConfig);

const userInfoValidator = createFormValidator('profile');
const cardFormValidator = createFormValidator('card');
const avatarFormValidator = createFormValidator('avatar');

const profileInfoEditButton = document.querySelector(userInfoSelectors.editButton);
const cardAddButton = document.querySelector(userInfoSelectors.addCardButton);

const cardsContainer = new Section(
  {renderer: createCardElement},
  '.elements__list'
);

const popupAvatarForm = new PopupWithForm(popupSelectors.popupEditAvatar, handleSubmitAvatar);
const userInfo = new UserInfo(userInfoSelectors, openAvatarEdit);
const popupUserInfo = new PopupWithForm(popupSelectors.popupEditProfile, handleSubmitProfile);
const popupAddCard = new PopupWithForm(popupSelectors.popupAddCard, handleSubmitAddCard);
const popupViewCard = new PopupWithImage(popupSelectors.popupViewCard);
const popupDeleteCard = new PopupWithConfirmDialog(popupSelectors.popupDeleteCard, deleteCard);

function createFormValidator(name) {
  const validator = new FormValidator(validationOptions, document.forms[name]);
  validator.enableValidation();
  return validator;
}

function openCardDetails(image) {
  popupViewCard.open(image);
}

function openDeleteCardDialog(cardComponent) {
  popupDeleteCard.open(cardComponent);
}

function deleteCard(cardComponent) {
  const cardId = cardComponent.getCardId();
  api.deleteCard(cardId)
    .then(() => {
      cardComponent.remove();
      popupDeleteCard.close();
    })
    .catch(error => console.log(error));
}

function likeCard(hasUserLike, cardId, card) {
  api.setLike(!hasUserLike, cardId)
    .then(result => {
      card.updateLikes(result.likes);
    })
    .catch(error => console.log(error));
}

function createCardElement(data) {
  const card = new Card(userInfo.getUserInfo().id, data, '#element-template',
    openCardDetails, openDeleteCardDialog, likeCard);
  return card.generateDomElement();
}

function handleSubmitAvatar(formData) {
  const submitText = "Сохранить";
  popupAvatarForm.setSubmitText(`${submitText}...`);
  api.updateUserAvatar(formData.avatar)
    .then(userData => {
      userInfo.setUserInfo(userData);
      popupAvatarForm.close();
    })
    .catch(error => console.log(error))
    .finally(() => {
      popupAvatarForm.setSubmitText(submitText);
    });
}

function openAvatarEdit() {
  popupAvatarForm.setValues({avatar: ''});
  avatarFormValidator.validateForm();
  avatarFormValidator.hideFormErrorMessages();
  popupAvatarForm.open();
}

function handleSubmitProfile(userData) {
  const submitText = "Сохранить";
  popupUserInfo.setSubmitText(`${submitText}...`);
  api.updateUserInfo({name: userData.name, about: userData.occupation})
    .then(user => {
      userInfo.setUserInfo({name: user.name, occupation: user.about});
      popupUserInfo.close();
    })
    .catch(error => console.log(error))
    .finally(() => {
      popupUserInfo.setSubmitText(submitText);
    })
}

function handleSubmitAddCard(cardData) {
  const submitText = "Создать";
  popupAddCard.setSubmitText(`${submitText}...`);
  api.createCard(cardData)
    .then(card => {
      cardsContainer.addItem(createCardElement(card));
      popupAddCard.close();
    })
    .catch(error => console.log(error))
    .finally(() => {
      popupAddCard.setSubmitText(submitText);
    });
}

function openUserInfoEditForm() {
  popupUserInfo.setValues(userInfo.getUserInfo());
  userInfoValidator.validateForm();
  popupUserInfo.open();
}

function openAddCardForm() {
  cardFormValidator.validateForm();
  cardFormValidator.hideFormErrorMessages();
  popupAddCard.open();
}

profileInfoEditButton.addEventListener('click', openUserInfoEditForm);
cardAddButton.addEventListener('click', openAddCardForm);
popupAvatarForm.setEventListeners();
popupUserInfo.setEventListeners();
popupAddCard.setEventListeners();
popupViewCard.setEventListeners();
popupDeleteCard.setEventListeners();

Promise.all([
  api.getUserInfo(),
  api.getCards()
]).then(([user, cards]) => {
  userInfo.setUserInfo({...user, occupation: user.about});
  cardsContainer.renderItems(cards.reverse());
}).catch(error => console.log(error));

