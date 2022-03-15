import { Card, popupViewCard, cardSelectors, popupSelectors, customEvents } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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

const openPopup = (popupElement) => {
  popupElement.classList.add(popupSelectors.popupOpenClass);
  popupElement.dispatchEvent(new CustomEvent(customEvents.popupOpened, {}));
}

const closePopup = (popupElement) => {
  popupElement.classList.remove(popupSelectors.popupOpenClass);
  popupElement.dispatchEvent(new CustomEvent(customEvents.popupClosed, {}));
}

const setFormProfile = () => {
  profileFormNameInput.value = profileInfoName.textContent;
  profileFormOccupationInput.value = profileInfoOccupation.textContent;
}

const saveProfile = () => {
  profileInfoName.textContent = profileFormNameInput.value;
  profileInfoOccupation.textContent = profileFormOccupationInput.value;
}

const addCard = (data, atStart = false) => {
  const card = new Card(data, cardSelectors.template);
  const cardElement = card.generateDomElement();
  if (atStart) {
    cardsContainer.prepend(cardElement);
  } else {
    cardsContainer.append(cardElement);
  }
}

const addCards = (cards) => {
  cards.forEach( (card) => addCard(card) );
}

const saveCard = () => {
  const card = {
    name: cardFormNameElement.value,
    photo: cardFormPhotoElement.value,
    photoDesc: cardFormNameElement.value,
    liked: false,
  };
  addCard(card, true);
}

const resetCardForm = () => {
  cardFormNameElement.value = '';
  cardFormPhotoElement.value = '';
}

profileInfoEditButton.addEventListener( 'click', () => {
  setFormProfile();
  editProfileForm.validator.validateForm();
  openPopup(popupEditProfile);
});

cardAddButton.addEventListener('click', () => {
  resetCardForm();
  cardForm.validator.validateForm();
  cardForm.validator.hideFormErrorMessages();
  openPopup(popupAddCard);
});

const setupFormIfExists = ( popupElement, handleSubmit ) => {
  const form = popupElement.querySelector(formSelectors.form);
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      handleSubmit(popupElement);
      closePopup(popupElement);
    });
  }
}

const setupCloseButton = ( popupElement ) => {
  const closeButton = popupElement.querySelector(popupSelectors.popupCloseButton);
  closeButton.addEventListener( 'click', () => closePopup(popupElement));
};

const closePopupOnEscapePress = (event) => {
  if (event.key === "Escape") {
    closePopup(closePopupOnEscapePress.popupElement);
  }
}

const handlePopupOpenEvent = (event) => {
  closePopupOnEscapePress.popupElement = event.target;
  closePopupOnEscapePress.popupElement.classList.add(popupSelectors.popupOpenClass);
  document.addEventListener( 'keyup', closePopupOnEscapePress);
}

const handlePopupCloseEvent = () => {
  if (closePopupOnEscapePress.popupElement) {
    closePopupOnEscapePress.popupElement.classList.remove(popupSelectors.popupOpenClass);
    delete closePopupOnEscapePress.popupElement;
  }

  document.removeEventListener( 'keyup', closePopupOnEscapePress);
}

const setupPopupOverlay = (popupElement) => {
  const popupContainer = popupElement.querySelector(popupSelectors.popupContainer);
  popupContainer.addEventListener( 'mousedown', (event) => {
    event.stopImmediatePropagation();
  });

  popupElement.addEventListener( 'mousedown', () => {
    closePopup(popupElement);
  });
};

const setupPopup = ( popupElement, handleSubmit ) => {
  popupElement.addEventListener( customEvents.popupOpened, handlePopupOpenEvent);
  popupElement.addEventListener( customEvents.popupClosed, handlePopupCloseEvent);
  setupCloseButton( popupElement );
  setupPopupOverlay( popupElement );
  setupFormIfExists( popupElement, handleSubmit );
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

setupPopup( popupEditProfile, saveProfile );
setupPopup( popupAddCard, saveCard );
setupPopup( popupViewCard );

addCards( initialCards.map( (card) => {
  return {
    name: card.name,
    photo: card.link,
    photoDesc: card.name,
    liked: false
  }
}));

export { openPopup };