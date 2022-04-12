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

function deleteCard(cardId) {
  popupDeleteCard.setValues({cardId: cardId});
  popupDeleteCard.open();
}

function generateCardElementSelectorClass(cardId) {
  return `element_card-id_${cardId}`;
}

function handleSubmitDeleteCard(formData) {
  const cardId = formData.cardId;
  api.deleteCard(cardId)
    .then((result) => {
      console.log(JSON.stringify(result));
      const cardSelector = `.${generateCardElementSelectorClass(cardId)}`;
      const cardElement = document.querySelector(cardSelector);
      if (isDefined(cardElement)) {
        cardElement.remove();
      } else {
        console.log(`ERROR: card with selector "${cardSelector}" not found!`);
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      // close confirm popup
      popupDeleteCard.close();
    });
}

function likeCard(hasUserLike, cardId, card) {
  api.setLike(!hasUserLike, cardId)
    .then(result => {
      card.updateLikes(result.likes);
    })
    .catch(error => console.log(error));
}

function createCardElement(data) {
  const card = new Card(userInfo.getUserInfo().id, data, generateCardElementSelectorClass(data._id), '#element-template', openCardDetails, deleteCard, likeCard);
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
    })
    .catch(error => console.log(error))
    .finally(() => {
      popupAvatarForm.setSubmitText(submitText);
      popupAvatarForm.close();
    });
}

const popupAvatarForm = new PopupWithForm(popupSelectors.popupEditAvatar, handleSubmitAvatar);
popupAvatarForm.setEventListeners();

function openAvatarEdit(avatarUrl) {
  popupAvatarForm.setValues({avatar: avatarUrl});
  avatarFormValidator.validateForm();
  popupAvatarForm.open();
}

const userInfo = new UserInfo(userInfoSelectors, openAvatarEdit);

function handleSubmitProfile(userData) {
  const submitText = "Сохранить";
  popupUserInfo.setSubmitText(`${submitText}...`);
  api.updateUserInfo({name: userData.name, about: userData.occupation})
    .then(user => userInfo.setUserInfo({name: user.name, occupation: user.about}))
    .catch(error => console.log(error))
    .finally(() => {
      popupUserInfo.setSubmitText(submitText);
      popupUserInfo.close();
    })
}

const popupUserInfo = new PopupWithForm(popupSelectors.popupEditProfile, handleSubmitProfile);
popupUserInfo.setEventListeners();

function handleSubmitAddCard(cardData) {
  const submitText = "Создать";
  popupAddCard.setSubmitText(`${submitText}...`);
  api.createCard(cardData)
    .then(card => cardsContainer.addItem(createCardElement(card)))
    .catch(error => console.log(error))
    .finally(() => {
      popupAddCard.setSubmitText(submitText);
      popupAddCard.close();
    });
}

const popupAddCard = new PopupWithForm(popupSelectors.popupAddCard, handleSubmitAddCard);
popupAddCard.setEventListeners();

const popupDeleteCard = new PopupWithForm(popupSelectors.popupDeleteCard, handleSubmitDeleteCard);
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

