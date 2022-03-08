class Form {
  constructor(selector) {
    this._selector = selector;
    this._setupElements();
  }

  _setupElements() {
    this._element = document.querySelector(this._selector);
    this._submitElement = this._element.querySelector('.form__save-btn')
  }
}

export { Form };