const SELECTORS = {
  page: '.page',
  popup: '.popup',
  popupOpenClass: 'popup_opened',
  form: '.profile-form',
  nameInput: '.profile-form__name',
  occupationInput: '.profile-form__occupation',
  closeButton: '.profile-form__close-btn',
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
  cardsContainer: '.elements__list'
}

const profileName = document.querySelector(SELECTORS.name);
const profileOccupation = document.querySelector(SELECTORS.occupation);
const popupElement = document.querySelector(SELECTORS.popup);
const formElement = document.querySelector(SELECTORS.form);
const nameInput = formElement.querySelector(SELECTORS.nameInput);
const occupationInput = formElement.querySelector(SELECTORS.occupationInput);
const closeButton = formElement.querySelector(SELECTORS.closeButton);
const editButton = document.querySelector(SELECTORS.editButton);
const cardsContainer = document.querySelector(CARD_SELECTORS.cardsContainer);

const openPopup = () => {
  popupElement.classList.add(SELECTORS.popupOpenClass);
}

const setFormProfile = () => {
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
}

const closePopup = () => {
  popupElement.classList.remove(SELECTORS.popupOpenClass);
}

const saveProfile = () => {
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
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

const addCards = (cards) => {
  const elements = cards.map( (card) => createCardElement(card));
  cardsContainer.append( ...elements );
}

const removeCard = (cardElement) => {
  cardsContainer.removeChild(cardElement);
}

closeButton.addEventListener( 'click', closePopup );

editButton.addEventListener( 'click', () => {
  setFormProfile();
  openPopup();
});

formElement.addEventListener( 'submit', (e) => {
    e.preventDefault();
    saveProfile();
    closePopup();
  }
);


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