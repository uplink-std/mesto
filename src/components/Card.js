import { hasItems } from "../util/predicates.js";

class Card {

  constructor(userId, card, templateSelector, handleCardClick, handleDeleteClick) {
    this._userId = userId;
    this._card = card;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    return this;
  }

  generateDomElement() {
    const cardElementTemplate = document.querySelector(this._templateSelector).content;
    this._element = cardElementTemplate.querySelector('.element').cloneNode(true);
    this._initCardPhoto();
    this._initCardName();
    this._initCardLikes();
    this._initTrashButton();
    return this._element;
  }

  _initCardPhoto() {
    const photoElement = this._element.querySelector('.element__photo');
    photoElement.src = this._card.link;
    photoElement.alt = this._card.name;
    photoElement.addEventListener( 'click', (e) => {
      this._handleCardClick({ name: this._card.name, link: this._card.link });
    });
  }

  _initCardName() {
    const nameElement = this._element.querySelector('.element__name');
    nameElement.textContent = this._card.name;
  }

  _initCardLikes() {
    if ( hasItems(this._card.likes) ) {
      const likeCounterElement = this._element.querySelector('.element__like-counter');
      likeCounterElement.textContent = this._card.likes.length;
    }
    const likeButtonElement = this._element.querySelector('.element__like-btn');
    likeButtonElement.addEventListener( 'click', this._toggleLike.bind(this) );
  }

  _initTrashButton() {
    if (this._userId === this._card.owner._id) {
      const trashButtonElement = this._element.querySelector('.element__trash-btn');
      trashButtonElement.classList.add('element__trash-btn_active');
      trashButtonElement.addEventListener('click', (e) => {
        this._handleDeleteClick(this._card._id, this._element)
      });
    }
  }

  _toggleLike(event) {
    event.target.classList.toggle('element__like-btn_active');
  }

}

export { Card };