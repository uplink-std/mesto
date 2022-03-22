import { Popup } from "./Popup.js"

class PopupWithForm extends Popup {

  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback.bind(this);
    this._setFormElements();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitCallback);
  }

  close() {
    super.close();
    this.reset();
  }

  reset() {
    this._formElement.reset();
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach( (inputElement) => { values[inputElement.id] = inputElement.value; } )
    return values;
  }

  _setFormElements() {
    this._formElement = this._element.querySelector('.form');
    this._submitButtonElement = this._formElement.querySelector('.form__save-btn');
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
  }

}

export { PopupWithForm };