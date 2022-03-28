import { Popup } from "./Popup.js"

class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._setContainerElements();
  }

  setImage( link, name ) {
    this._link = link;
    this._name = name;
  }

  open() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;
    super.open();
  }

  _setContainerElements() {
    this._viewElement = document.querySelector('.popup_view-card');
    this._imageElement = this._viewElement.querySelector('.card-details__photo');
    this._nameElement = this._viewElement.querySelector('.card-details__name');
  }

}

export { PopupWithImage };
