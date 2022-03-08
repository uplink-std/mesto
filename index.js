import { Card } from "./Card.js";
import { Profile } from "./Profile.js";

const cardSelectors = {
  template: '#element-template',
  cardsContainer: '.elements__list',
}

const cardsContainer = document.querySelector(cardSelectors.cardsContainer);

const addCards = (cards) => {
  cards.forEach( (card) => addCard(card) );
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

const profile = new Profile('.profile');
profile.setProfile({ name: "Жак-Ив Кусто", occupation: "Исследователь океана" });