import { Popup } from "./Popup.js"

class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._setContainerElements();
  }

  setImage( source, name ) {
    this._imageSource = source;
    this._imageName = name;
  }

  open() {
    this._imageElement.src = this._imageSource;
    this._imageElement.alt = this._imageName;
    this._nameElement.textContent = this._imageName;
    super.open();
  }

  _setContainerElements() {
    this._viewElement = document.querySelector('.popup_view-card');
    this._imageElement = this._viewElement.querySelector('.card-details__photo');
    this._nameElement = this._viewElement.querySelector('.card-details__name');
  }

}

export { PopupWithImage };
