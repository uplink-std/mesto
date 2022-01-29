const SELECTORS = {
  page: '.page',
  popup: '.popup',
  popupOpenClass: 'popup_opened',
  form: '.form',
  formActiveClass: 'form_active',
  profileForm: '.profile-form',
  profileNameInput: '.profile-form__name',
  profileOccupationInput: '.profile-form__occupation',
  profileFormCloseButton: '.profile-form__close-btn',
  cardFormCloseButton: '.card-form__close-btn',
  cardForm: '.card-form',
  name: '.profile__info-name',
  occupation: '.profile__info-occupation',
  avatar: '.profile__avatar',
  editButton: '.profile__edit-btn',
  addButton: '.profile__add-btn',
};

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

const profileInfoName = document.querySelector(SELECTORS.name);
const profileInfoOccupation = document.querySelector(SELECTORS.occupation);
const profileInfoEditButton = document.querySelector(SELECTORS.editButton);

const popupElement = document.querySelector(SELECTORS.popup);

const profileFormElement = document.querySelector(SELECTORS.profileForm);
const profileNameInput = profileFormElement.querySelector(SELECTORS.profileNameInput);
const profileOccupationInput = profileFormElement.querySelector(SELECTORS.profileOccupationInput);
const profileFormCloseButton = profileFormElement.querySelector(SELECTORS.profileFormCloseButton);

const cardFormElement = document.querySelector(SELECTORS.cardForm);
const cardFormCloseButton = cardFormElement.querySelector(SELECTORS.cardFormCloseButton);
const cardAddButton = document.querySelector(SELECTORS.addButton);
const cardsContainer = document.querySelector(CARD_SELECTORS.cardsContainer);
const cardFormNameElement = cardFormElement.querySelector(CARD_SELECTORS.formName);
const cardFormPhotoElement = cardFormElement.querySelector(CARD_SELECTORS.formPhoto);

const openPopup = (formElement) => {
  popupElement.classList.add(SELECTORS.popupOpenClass);
  formElement.classList.add(SELECTORS.formActiveClass);
}

const closePopup = (formElement) => {
  popupElement.classList.remove(SELECTORS.popupOpenClass);
  formElement.classList.remove(SELECTORS.formActiveClass);
}

const setFormProfile = () => {
  profileNameInput.value = profileInfoName.textContent;
  profileOccupationInput.value = profileInfoOccupation.textContent;
}

const saveProfile = () => {
  profileInfoName.textContent = profileNameInput.value;
  profileInfoOccupation.textContent = profileOccupationInput.value;
}

const toggleLike = (likeButtonElement) => {
  likeButtonElement.classList.toggle(CARD_SELECTORS.likeButtonActiveClass);
}

const initCardPhoto = (cardElement, card) => {
  const photoElement = cardElement.querySelector(CARD_SELECTORS.photo);
  photoElement.src = card.photo;
  photoElement.alt = card.photoDesc;
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

const addCard = (card) => {
  const cardElement = createCardElement(card);
  cardsContainer.append( cardElement );
}

const addCards = (cards) => {
  cards.forEach( addCard );
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

profileFormCloseButton.addEventListener( 'click', () => closePopup(profileFormElement) );

profileInfoEditButton.addEventListener( 'click', () => {
  setFormProfile();
  openPopup(profileFormElement);
});

profileFormElement.addEventListener( 'submit', (event) => {
    event.preventDefault();
    saveProfile();
    closePopup(profileFormElement);
  }
);

cardFormElement.addEventListener( 'submit', (event) => {
  event.preventDefault();
  const card = getFormCard();
  addCard(card);
  closePopup(cardFormElement);
})

cardAddButton.addEventListener('click', () => {
  resetCardForm();
  openPopup(cardFormElement);
});

cardFormCloseButton.addEventListener( 'click', () => closePopup(cardFormElement) );


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