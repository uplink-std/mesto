class ProfileForm {

  constructor(selector) {
    this._selector = selector;
    this._setupElements();
  }

  setProfile(profile) {
    this._profile = profile;
    this._render();
  }

  getProfile() {
    return { ...this._profile };
  }

  _setupElements() {
    this._element = document.querySelector(this._selector);
    this._nameInputElement = this._element.querySelector('.profile-form__name');
    this._occupationInputElement = this._element.querySelector('.profile-form__occupation');
  }

  _render() {
    console.log(`RENDER: ProfileForm with model: ${JSON.stringify(this._profile)}`);
    this._nameInputElement.value = this._profile.name;
    this._occupationInputElement.value = this._profile.occupation;
  }

}

export { ProfileForm };