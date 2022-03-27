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

class Card {

  constructor(card, templateSelector, handleCardClick) {
    this._name = card.name;
    this._photo = card.photo;
    this._photoDesc = card.photoDesc;
    this._liked = card.liked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    return this;
  }

  generateDomElement() {
    const cardElementTemplate = document.querySelector(this._templateSelector).content;
    this._element = cardElementTemplate.querySelector(cardSelectors.element).cloneNode(true);
    this._initCardPhoto();
    this._initCardName();
    this._initCardLikeButton();
    this._initTrashButton();
    return this._element;
  }

  getImage() {
    return {
      name: this._photoDesc,
      source: this._photo
    }
  }

  _initCardPhoto() {
    const photoElement = this._element.querySelector(cardSelectors.photo);
    photoElement.src = this._photo;
    photoElement.alt = this._photoDesc;
    photoElement.addEventListener( 'click', this._handleCardClick.bind(this));
  }

  _initCardName() {
    const nameElement = this._element.querySelector(cardSelectors.name);
    nameElement.textContent = this._name;
  }

  _initCardLikeButton() {
    const likeButtonElement = this._element.querySelector(cardSelectors.likeButton);
    if (this._liked) {
      likeButtonElement.classList.add(cardSelectors.likeButtonActiveClass);
    }
    likeButtonElement.addEventListener( 'click', this._toggleLike.bind(this) );
  }

  _initTrashButton() {
    const trashButtonElement = this._element.querySelector(cardSelectors.trashButton);
    trashButtonElement.addEventListener( 'click', this._removeCard.bind(this));
  }

  _toggleLike(event) {
    event.target.classList.toggle(cardSelectors.likeButtonActiveClass);
  }

  _removeCard() {
    this._element.remove();
  }
}

export { Card, cardSelectors };