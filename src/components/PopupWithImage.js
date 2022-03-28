import { Popup } from "./Popup.js"

class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._setContainerElements();
  }

  open({ name, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._nameElement.textContent = name;
    super.open();
  }

  _setContainerElements() {
    this._viewElement = document.querySelector('.popup_view-card');
    this._imageElement = this._viewElement.querySelector('.card-details__photo');
    this._nameElement = this._viewElement.querySelector('.card-details__name');
  }

}

export { PopupWithImage };
