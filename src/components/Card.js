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
    this._element = cardElementTemplate.querySelector('.element').cloneNode(true);
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
    const photoElement = this._element.querySelector('.element__photo');
    photoElement.src = this._photo;
    photoElement.alt = this._photoDesc;
    photoElement.addEventListener( 'click', this._handleCardClick.bind(this));
  }

  _initCardName() {
    const nameElement = this._element.querySelector('.element__name');
    nameElement.textContent = this._name;
  }

  _initCardLikeButton() {
    const likeButtonElement = this._element.querySelector('.element__like-btn');
    if (this._liked) {
      likeButtonElement.classList.add('element__like-btn_active');
    }
    likeButtonElement.addEventListener( 'click', this._toggleLike.bind(this) );
  }

  _initTrashButton() {
    const trashButtonElement = this._element.querySelector('.element__trash-btn');
    trashButtonElement.addEventListener( 'click', this._removeCard.bind(this));
  }

  _toggleLike(event) {
    event.target.classList.toggle('element__like-btn_active');
  }

  _removeCard() {
    this._element.remove();
  }
}

export { Card };