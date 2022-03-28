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
    this._imageElement = this._element.querySelector('.card-details__photo');
    this._nameElement = this._element.querySelector('.card-details__name');
  }

}

export { PopupWithImage };
