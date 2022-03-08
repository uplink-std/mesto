class CardDetailsView {

  constructor(viewSelector) {
    this._viewElement = document.querySelector(viewSelector);
    this._photoElement = this._viewElement.querySelector('.card-details__photo');
    this._nameElement = this._viewElement.querySelector('.card-details__name');
  }

  setCard(name, photo, photoDesc) {
    this._nameElement.textContent = name;
    this._photoElement.src = photo;
    this._photoElement.alt = photoDesc;
  }

}

export { CardDetailsView };