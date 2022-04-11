import {hasItems, isUndefined} from "../util/predicates.js";

class Card {

  constructor(userId, card, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._userId = userId;
    this._card = card;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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

  updateLikes(likes) {
    this._card.likes = likes;
    this._renderLikes();
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
    this._likeCounterElement = this._element.querySelector('.element__like-counter');
    this._likeButtonElement = this._element.querySelector('.element__like-btn');
    this._likeButtonElement.addEventListener( 'click', (e) => this._handleLikeClick(this._hasUserLike(), this._card._id, this) );
    this._renderLikes();
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

  _renderLikes() {
    const activeClass = 'element__like-btn_active';
    const likesCount = this._countLikes(this._card.likes);
    this._likeCounterElement.textContent = likesCount > 0 ? likesCount : '';

    if ( this._hasUserLike() ) {
      this._likeButtonElement.classList.add(activeClass);
    } else {
      this._likeButtonElement.classList.remove(activeClass);
    }
  }

  _countLikes(likes) {
    return hasItems(likes) ? likes.length : 0;
  }

  _hasUserLike() {
    if (isUndefined(this._card.likes)) {
      return false;
    }
    return this._card.likes.some(owner => owner._id === this._userId);
  }
}

export { Card };