class Form {
  constructor(selector, handleSubmitEvent) {
    this._selector = selector;
    this._handleSubmitEvent = handleSubmitEvent;
    this._setupElements();
  }

  setModel(model) {
    console.log("Warning! Form's method setModel is not defined!");
  }

  getModel() {
    console.log("Warning! Form's method getModel is not defined!");
    return undefined;
  }

  _setupElements() {
    this._element = document.querySelector(this._selector);
    this._submitElement = this._element.querySelector('.form__save-btn');
    this._element.addEventListener('submit', (e) => this._handleSubmitEventInternal(e));
  }

  _handleSubmitEventInternal(event) {
      event.preventDefault();
      this._handleSubmitEvent(event, this);
  }

}

export { Form };