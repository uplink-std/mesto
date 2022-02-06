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

const popupSelectors = {
  popupCloseButton: '.popup__close-btn',
  popupOpenClass: 'popup_opened',
  popupEditProfile: '.popup_edit-profile',
  popupAddCard: '.popup_add-card',
  popupViewCard: '.popup_view-card',
  popupContainer: '.popup__container',
}

const cardSelectors = {
  template: '#element-template',
  element: '.element',
  photo: '.element__photo',
  name: '.element__name',
  likeButton: '.element__like-btn',
  trashButton: '.element__trash-btn',
  likeButtonActiveClass: 'element__like-btn_active',
  cardsContainer: '.elements__list',
  formName: '.card-form__name',
  formPhoto: '.card-form__photo',
}

const cardDetailsSelectors = {
  photo: '.card-details__photo',
  name: '.card-details__name'
}

const customEvents = {
  popupOpened: 'popupOpeened',
  popupClosed: 'popupClosed',
}

const popupEditProfile = document.querySelector(popupSelectors.popupEditProfile);
const popupAddCard = document.querySelector(popupSelectors.popupAddCard);
const popupViewCard = document.querySelector(popupSelectors.popupViewCard);

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

const cardDetailsPhoto = popupViewCard.querySelector(cardDetailsSelectors.photo);
const cardDetailsName = popupViewCard.querySelector(cardDetailsSelectors.name);

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

const toggleLike = (likeButtonElement) => {
  likeButtonElement.classList.toggle(cardSelectors.likeButtonActiveClass);
}

const initCardPhoto = (cardElement, card) => {
  const photoElement = cardElement.querySelector(cardSelectors.photo);
  photoElement.src = card.photo;
  photoElement.alt = card.photoDesc;
  photoElement.addEventListener( 'click', (event) => openCardDetails(event.target, card));
}

const initCardName = (cardElement, card) => {
  const nameElement = cardElement.querySelector(cardSelectors.name);
  nameElement.textContent = card.name;
}

const initCardLikeButton = (cardElement, card) => {
  const likeButtonElement = cardElement.querySelector(cardSelectors.likeButton);
  if (card.liked) {
    likeButtonElement.classList.add(cardSelectors.likeButtonActiveClass);
  }
  likeButtonElement.addEventListener( 'click', (event) => toggleLike(event.target) );
}

const initTrashButton = (cardElement) => {
  const trashButtonElement = cardElement.querySelector(cardSelectors.trashButton);
  trashButtonElement.addEventListener( 'click', (event) => {
    const cardElement = event.target.closest(cardSelectors.element);
    removeCard(cardElement);
  } );
}

const createCardElement = (card) => {
  const cardElementTemplate = document.querySelector(cardSelectors.template).content;
  const cardElement = cardElementTemplate.querySelector(cardSelectors.element).cloneNode(true);
  initCardPhoto(cardElement, card);
  initCardName(cardElement, card);
  initCardLikeButton(cardElement, card);
  initTrashButton(cardElement);
  return cardElement;
}

const addCard = (card, atStart = false) => {
  const cardElement = createCardElement(card);
  if (atStart) {
    cardsContainer.prepend(cardElement);
  } else {
    cardsContainer.append(cardElement);
  }
}

const addCards = (cards) => {
  cards.forEach( (card) => addCard(card) );
}

const removeCard = (cardElement) => {
  cardsContainer.removeChild(cardElement);
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

const openCardDetails = (cardPhoto, card) => {
  cardDetailsPhoto.src = card.photo;
  cardDetailsPhoto.alt = card.photoDesc;
  cardDetailsName.textContent = card.name;
  openPopup(popupViewCard);
}

profileInfoEditButton.addEventListener( 'click', () => {
  setFormProfile();
  validateForm(editProfileForm);
  openPopup(popupEditProfile);
});

cardAddButton.addEventListener('click', () => {
  resetCardForm();
  validateForm(cardForm);
  hideFormErrorMessages(cardForm);
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
  closeButton.addEventListener( 'click', () => closePopup(popupElement) );
};

const closePopupOnEscapePress = (event) => {
  if (event.key === "Escape") {
    closePopup(closePopupOnEscapePress.popupElement);
  }
}

const handlePopupOpenEvent = (event) => {
  closePopupOnEscapePress.popupElement = event.target;
  document.addEventListener( 'keyup', closePopupOnEscapePress);
}

const handlePopupCloseEvent = () => {
  document.removeEventListener( 'keyup', closePopupOnEscapePress);
  delete closePopupOnEscapePress.popupElement;
}

const setupPopupOverlay = (popupElement) => {
  const popupContainer = popupElement.querySelector(popupSelectors.popupContainer);
  popupContainer.addEventListener( 'click', (event) => {
    event.stopImmediatePropagation();
  });

  popupElement.addEventListener( 'click', () => {
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

enableValidation(validationOptions);

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
