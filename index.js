const SELECTORS = {
  profileForm: '.profile-form',
  profileNameInput: '.profile-form__name',
  profileOccupationInput: '.profile-form__occupation',
  cardForm: '.card-form',
  profileInfoName: '.profile__info-name',
  profileInfoOccupation: '.profile__info-occupation',
  editButton: '.profile__edit-btn',
  addCardButton: '.profile__add-btn',
};

const FADE_CONTENT_SELECTORS = {
  visibleClass: 'fade-content_visible',
};

const POPUP_SELECTORS = {
  popup: '.popup',
  popupDarkClass: 'popup_dark',
  popupCloseButton: '.popup__close-btn',
  popupOpenClass: 'popup_opened',
  popupContainer: '.popup__container',
  popupContainerActiveClass: 'popup__container_active',
}

const CARD_SELECTORS = {
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

const CARD_DETAILS_SELECTORS = {
  cardDetails: '.card-details',
  photo: '.card-details__photo',
  name: '.card-details__name'
}

const profileInfoName = document.querySelector(SELECTORS.profileInfoName);
const profileInfoOccupation = document.querySelector(SELECTORS.profileInfoOccupation);
const profileInfoEditButton = document.querySelector(SELECTORS.editButton);

const popupElement = document.querySelector(POPUP_SELECTORS.popup);

const profileForm = document.querySelector(SELECTORS.profileForm);
const profileFormContainer = profileForm.closest(POPUP_SELECTORS.popupContainer);
const profileCloseButton = profileFormContainer.querySelector(POPUP_SELECTORS.popupCloseButton);
const profileFormNameInput = profileForm.querySelector(SELECTORS.profileNameInput);
const profileFormOccupationInput = profileForm.querySelector(SELECTORS.profileOccupationInput);


const cardFormElement = document.querySelector(SELECTORS.cardForm);
const cardFormContainer = cardFormElement.closest(POPUP_SELECTORS.popupContainer);
const cardFormCloseButton = cardFormContainer.querySelector(POPUP_SELECTORS.popupCloseButton);
const cardAddButton = document.querySelector(SELECTORS.addCardButton);
const cardsContainer = document.querySelector(CARD_SELECTORS.cardsContainer);
const cardFormNameElement = cardFormElement.querySelector(CARD_SELECTORS.formName);
const cardFormPhotoElement = cardFormElement.querySelector(CARD_SELECTORS.formPhoto);

const cardDetails = document.querySelector(CARD_DETAILS_SELECTORS.cardDetails);
const cardDetailsPopupContainer = cardDetails.closest(POPUP_SELECTORS.popupContainer);
const cardDetailsCloseButton = cardDetailsPopupContainer.querySelector(POPUP_SELECTORS.popupCloseButton);
const cardDetailsPhoto = cardDetails.querySelector(CARD_DETAILS_SELECTORS.photo);
const cardDetailsName = cardDetails.querySelector(CARD_DETAILS_SELECTORS.name);

const openPopup = (popupContainer, popupModifierClass) => {
  popupElement.classList.add(POPUP_SELECTORS.popupOpenClass);
  popupElement.classList.add(FADE_CONTENT_SELECTORS.visibleClass);
  if (popupModifierClass) {
    popupElement.classList.add(popupModifierClass);
  }
  popupContainer.classList.add(POPUP_SELECTORS.popupContainerActiveClass);
  popupContainer.classList.add(FADE_CONTENT_SELECTORS.visibleClass);
}

const closePopup = (popupContainer, popupModifierClass) => {
  popupContainer.classList.remove(FADE_CONTENT_SELECTORS.visibleClass);

  popupElement.classList.remove(FADE_CONTENT_SELECTORS.visibleClass);
  popupElement.classList.remove(POPUP_SELECTORS.popupOpenClass);
  if (popupModifierClass) {
    popupElement.classList.remove(popupModifierClass);
  }

  setTimeout(() => {
    popupContainer.classList.remove(POPUP_SELECTORS.popupContainerActiveClass);
  }, 1000);
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
  likeButtonElement.classList.toggle(CARD_SELECTORS.likeButtonActiveClass);
}

const initCardPhoto = (cardElement, card) => {
  const photoElement = cardElement.querySelector(CARD_SELECTORS.photo);
  photoElement.src = card.photo;
  photoElement.alt = card.photoDesc;
  photoElement.addEventListener( 'click', (event) => openCardDetails(event.target, card));
}

const initCardName = (cardElement, card) => {
  const nameElement = cardElement.querySelector(CARD_SELECTORS.name);
  nameElement.textContent = card.name;
}

const initCardLikeButton = (cardElement, card) => {
  const likeButtonElement = cardElement.querySelector(CARD_SELECTORS.likeButton);
  if (card.liked) {
    likeButtonElement.classList.add(CARD_SELECTORS.likeButtonActiveClass);
  }
  likeButtonElement.addEventListener( 'click', (event) => toggleLike(event.target) );
}

const initTrashButton = (cardElement) => {
  const trashButtonElement = cardElement.querySelector(CARD_SELECTORS.trashButton);
  trashButtonElement.addEventListener( 'click', (event) => {
    const cardElement = event.target.closest(CARD_SELECTORS.element);
    removeCard(cardElement);
  } );
}

const createCardElement = (card) => {
  const cardElementTemplate = document.querySelector(CARD_SELECTORS.template).content;
  const cardElement = cardElementTemplate.querySelector(CARD_SELECTORS.element).cloneNode(true);
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

const getFormCard = () => {
  return {
    name: cardFormNameElement.value,
    photo: cardFormPhotoElement.value,
    photoDesc: cardFormNameElement.value,
    liked: false,
  }
}

const resetCardForm = () => {
  cardFormNameElement.value = '';
  cardFormPhotoElement.value = '';
}

const openCardDetails = (cardPhoto, card) => {
  openPopup(cardDetailsPopupContainer, POPUP_SELECTORS.popupDarkClass);
  cardDetailsPhoto.src = card.photo;
  cardDetailsName.textContent = card.name;
}

cardDetailsCloseButton.addEventListener('click', () => closePopup(cardDetailsPopupContainer, POPUP_SELECTORS.popupDarkClass));

profileCloseButton.addEventListener( 'click', () => closePopup(profileFormContainer) );


profileInfoEditButton.addEventListener( 'click', () => {
  setFormProfile();
  openPopup(profileFormContainer);
});

profileForm.addEventListener( 'submit', (event) => {
    event.preventDefault();
    saveProfile();
    closePopup(profileFormContainer);
  }
);

cardFormElement.addEventListener( 'submit', (event) => {
  event.preventDefault();
  const card = getFormCard();
  addCard(card, true);
  closePopup(cardFormContainer);
})

cardAddButton.addEventListener('click', () => {
  resetCardForm();
  openPopup(cardFormContainer);
});

cardFormCloseButton.addEventListener( 'click', () => closePopup(cardFormContainer) );

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

addCards( initialCards.map( (card) => {
  return {
    name: card.name,
    photo: card.link,
    photoDesc: card.name,
    liked: false
  }
}));