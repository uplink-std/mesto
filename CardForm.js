import { Form } from "./Form.js"

class CardForm extends Form {

  constructor(selector, handleSubmitEvent) {
    super(selector, handleSubmitEvent);
  }

  setModel(card) {
    this._nameInputElement.value = card.name;
    this._photoInputElement.value = card.photo;
  }

  getModel() {
    return {
      name: this._nameInputElement.value,
      photo: this._photoInputElement.value,
    };
  }

  _setupElements() {
    super._setupElements();
    this._nameInputElement = this._element.querySelector('.card-form__name');
    this._photoInputElement = this._element.querySelector('.card-form__photo');
  }

}

export { CardForm };