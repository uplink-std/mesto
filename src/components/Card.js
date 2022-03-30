class Card {

  constructor(card, templateSelector, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
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
      name: this._name,
      link: this._link
    }
  }

  _initCardPhoto() {
    const photoElement = this._element.querySelector('.element__photo');
    photoElement.src = this._link;
    photoElement.alt = this._name;
    photoElement.addEventListener( 'click', (e) => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  _initCardName() {
    const nameElement = this._element.querySelector('.element__name');
    nameElement.textContent = this._name;
  }

  _initCardLikeButton() {
    const likeButtonElement = this._element.querySelector('.element__like-btn');
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
    this._element = null;
  }
}

export { Card };