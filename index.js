const selectors = {
  profileForm: '.profile-form',
  profileNameInput: '.profile-form__name',
  profileOccupationInput: '.profile-form__occupation',
  cardForm: '.card-form',
  profileInfoName: '.profile__info-name',
  profileInfoOccupation: '.profile__info-occupation',
  editButton: '.profile__edit-btn',
  addCardButton: '.profile__add-btn',
};

const popupSelectors = {
  popup: '.popup',
  popupDarkClass: 'popup_dark',
  popupCloseButton: '.popup__close-btn',
  popupOpenClass: 'popup_opened',
  popupContainer: '.popup__container',
  popupContainerActiveClass: 'popup__container_active',
  popupEditProfile: '.popup_edit-profile',
  popupAddCard: '.popup_add-card',
  popupViewCard: '.popup_view-card',
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
  cardDetails: '.card-details',
  photo: '.card-details__photo',
  name: '.card-details__name'
}

const profileInfoName = document.querySelector(selectors.profileInfoName);
const profileInfoOccupation = document.querySelector(selectors.profileInfoOccupation);
const profileInfoEditButton = document.querySelector(selectors.editButton);

const popupEditProfile = document.querySelector(popupSelectors.popupEditProfile);
const popupAddCard = document.querySelector(popupSelectors.popupAddCard);
const popupViewCard = document.querySelector(popupSelectors.popupViewCard);

const profileForm = document.querySelector(selectors.profileForm);
const profileFormContainer = profileForm.closest(popupSelectors.popupContainer);
const profileCloseButton = profileFormContainer.querySelector(popupSelectors.popupCloseButton);
const profileFormNameInput = profileForm.querySelector(selectors.profileNameInput);
const profileFormOccupationInput = profileForm.querySelector(selectors.profileOccupationInput);


const cardFormElement = document.querySelector(selectors.cardForm);
const cardFormContainer = cardFormElement.closest(popupSelectors.popupContainer);
const cardFormCloseButton = cardFormContainer.querySelector(popupSelectors.popupCloseButton);
const cardAddButton = document.querySelector(selectors.addCardButton);
const cardsContainer = document.querySelector(cardSelectors.cardsContainer);
const cardFormNameElement = cardFormElement.querySelector(cardSelectors.formName);
const cardFormPhotoElement = cardFormElement.querySelector(cardSelectors.formPhoto);

const cardDetails = document.querySelector(cardDetailsSelectors.cardDetails);
const cardDetailsPopupContainer = cardDetails.closest(popupSelectors.popupContainer);
const cardDetailsCloseButton = cardDetailsPopupContainer.querySelector(popupSelectors.popupCloseButton);
const cardDetailsPhoto = cardDetails.querySelector(cardDetailsSelectors.photo);
const cardDetailsName = cardDetails.querySelector(cardDetailsSelectors.name);

const openPopup = (popupElement) => {
  popupElement.classList.add(popupSelectors.popupOpenClass);
}

const closePopup = (popupElement) => {
  popupElement.classList.remove(popupSelectors.popupOpenClass);
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
  cardDetailsPhoto.src = card.photo;
  cardDetailsPhoto.alt = card.photoDesc;
  cardDetailsName.textContent = card.name;
  openPopup(popupViewCard);
}

cardDetailsCloseButton.addEventListener('click', () => closePopup(popupViewCard));

profileCloseButton.addEventListener( 'click', () => closePopup(popupEditProfile) );


profileInfoEditButton.addEventListener( 'click', () => {
  setFormProfile();
  openPopup(popupEditProfile);
});

profileForm.addEventListener( 'submit', (event) => {
    event.preventDefault();
    saveProfile();
    closePopup(popupEditProfile);
  }
);

cardFormElement.addEventListener( 'submit', (event) => {
  event.preventDefault();
  const card = getFormCard();
  addCard(card, true);
  closePopup(popupAddCard);
})

cardAddButton.addEventListener('click', () => {
  resetCardForm();
  openPopup(popupAddCard);
});

cardFormCloseButton.addEventListener( 'click', () => closePopup(popupAddCard) );

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