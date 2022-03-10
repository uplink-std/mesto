import { Popup } from "./Popup.js";
import { ProfileForm } from "./ProfileForm.js";

class ProfileView {

  constructor(selector) {
    this._selector = selector;
    this._setElements();
  }

  setProfile(profile) {
    this._nameElement.textContent = profile.name;
    this._occupationElement.textContent = profile.occupation;
  }

  getProfile() {
    return {
      name: this._nameElement.textContent,
      occupation: this._occupationElement.textContent,
    };
  }

  _setElements() {
    this._editProfilePopup = new Popup(".popup_edit-profile");
    this._profileForm = new ProfileForm('.profile-form', (event, form) => this._handleSubmitForm(event, form));
    this._element = document.querySelector(this._selector);
    this._nameElement = this._element.querySelector('.profile__info-name');
    this._occupationElement = this._element.querySelector('.profile__info-occupation');
    this._editButtonElement = this._element.querySelector('.profile__edit-btn');
    this._editButtonElement.addEventListener( 'click', () => this._handleEditButtonClick());
  }

  _handleEditButtonClick() {
    this._profileForm.setModel(this.getProfile());
    // TODO: validateForm(editProfileForm);
    this._editProfilePopup.open();
  }

  _handleSubmitForm(event, form) {
    this.setProfile(form.getModel());
    this._editProfilePopup.close();
  }

}

export { ProfileView };