import {Popup} from "./Popup.js";

class PopupWithConfirmDialog extends Popup {

  constructor(popupSelector, acceptCallback) {
    super(popupSelector);
    this._targetComponent = undefined;
    this._acceptCallback = acceptCallback.bind(this);
    this._setAcceptElements();
  }

  setEventListeners() {
    super.setEventListeners();
    this._acceptButtonElement.addEventListener('click', (e) => {
      e.preventDefault();
      this._acceptCallback(this._targetComponent);
    });
  }

  open(targetComponent) {
    this._targetComponent = targetComponent;
    super.open();
  }

  _setAcceptElements() {
    this._acceptButtonElement = this._element.querySelector('.form__save-btn');
  }
}

export { PopupWithConfirmDialog };