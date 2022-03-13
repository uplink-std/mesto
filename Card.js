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

const popupSelectors = {
  popupCloseButton: '.popup__close-btn',
  popupOpenClass: 'popup_opened',
  popupEditProfile: '.popup_edit-profile',
  popupAddCard: '.popup_add-card',
  popupViewCard: '.popup_view-card',
  popupContainer: '.popup__container',
}

const customEvents = {
  popupOpened: 'popupOpened',
  popupClosed: 'popupClosed',
}

const popupViewCard = document.querySelector(popupSelectors.popupViewCard);

class Card {

  constructor(card, templateSelector) {
    this._name = card.name;
    this._photo = card.photo;
    this._photoDesc = card.photoDesc;
    this._liked = card.liked;
    this._templateSelector = templateSelector;
  }

  generateDomElement() {
    const cardElementTemplate = document.querySelector(this._templateSelector).content;
    this._element = cardElementTemplate.querySelector(cardSelectors.element).cloneNode(true);
    this._initCardPhoto();
    this._initCardName();
    this._initCardLikeButton();
    this._initTrashButton();
    this._initCardDetails();
    return this._element;
  }

  _initCardPhoto() {
    const photoElement = this._element.querySelector(cardSelectors.photo);
    photoElement.src = this._photo;
    photoElement.alt = this._photoDesc;
    photoElement.addEventListener( 'click', () => this._openCardDetails());
  }

  _openCardDetails() {
    this._detailsName.textContent = this._name;
    this._detailsPhoto.src = this._photo;
    this._detailsPhoto.alt = this._photoDesc;
    popupViewCard.dispatchEvent(new CustomEvent(customEvents.popupOpened, {}));
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
    likeButtonElement.addEventListener( 'click', (event) => this._toggleLike(event.target) );
  }

  _initTrashButton() {
    const trashButtonElement = this._element.querySelector(cardSelectors.trashButton);
    trashButtonElement.addEventListener( 'click', () =>  this._removeCard());
  }

  _toggleLike(likeButtonElement) {
    likeButtonElement.classList.toggle(cardSelectors.likeButtonActiveClass);
  }

  _removeCard() {
    this._element.remove();
  }

  _initCardDetails() {
    this._detailsPhoto = popupViewCard.querySelector('.card-details__photo');
    this._detailsName = popupViewCard.querySelector('.card-details__name');
  }
}

export { Card, popupViewCard, cardSelectors, popupSelectors, customEvents };