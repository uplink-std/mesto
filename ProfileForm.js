import { Form } from "./Form.js"


class ProfileForm extends Form {

  constructor(selector, handleSubmitEvent) {
    super(selector, handleSubmitEvent);
    this._setupElements();
  }

  setModel(profile) {
    this._nameInputElement.value = profile.name;
    this._occupationInputElement.value = profile.occupation;
  }

  getModel() {
    return {
      name: this._nameInputElement.value,
      occupation: this._occupationInputElement.value,
    };
  }

  _setupElements() {
    super._setupElements();
    this._nameInputElement = this._element.querySelector('.profile-form__name');
    this._occupationInputElement = this._element.querySelector('.profile-form__occupation');
  }

}

export { ProfileForm };