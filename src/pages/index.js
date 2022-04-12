import './index.css';
import {apiConfig, popupSelectors, userInfoSelectors, validationOptions} from "../util/constants.js"
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Section} from "../components/Section.js";
import {RestClient} from "../components/RestClient.js";
import {Api} from "../components/Api.js";
import {isDefined} from "../util/predicates";
import {PopupWithConfirmDialog} from "../components/PopupWithConfirmDialog";

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
  const card = new Card(userInfo.getUserInfo().id, data, '#element-template', openCardDetails, openDeleteCardDialog, likeCard);
  return card.generateDomElement();
}

const cardsContainer = new Section(
  {renderer: createCardElement},
  '.elements__list'
);

const popupViewCard = new PopupWithImage(popupSelectors.popupViewCard);
popupViewCard.setEventListeners();

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

const popupAvatarForm = new PopupWithForm(popupSelectors.popupEditAvatar, handleSubmitAvatar);
popupAvatarForm.setEventListeners();

function openAvatarEdit(avatarUrl) {
  popupAvatarForm.setValues({avatar: ''});
  avatarFormValidator.validateForm();
  avatarFormValidator.hideFormErrorMessages();
  popupAvatarForm.open();
}

const userInfo = new UserInfo(userInfoSelectors, openAvatarEdit);

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

const popupUserInfo = new PopupWithForm(popupSelectors.popupEditProfile, handleSubmitProfile);
popupUserInfo.setEventListeners();

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

const popupAddCard = new PopupWithForm(popupSelectors.popupAddCard, handleSubmitAddCard);
popupAddCard.setEventListeners();

const popupDeleteCard = new PopupWithConfirmDialog(popupSelectors.popupDeleteCard, deleteCard);
popupDeleteCard.setEventListeners();

function openUserInfoEditForm() {
  popupUserInfo.setValues(userInfo.getUserInfo());
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
]).then(([user, cards]) => {
  userInfo.setUserInfo({...user, occupation: user.about});
  cardsContainer.renderItems(cards.reverse());
}).catch(error => console.log(error));

