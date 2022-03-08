import { Popup } from "./Popup.js";
import { ProfileForm } from "./ProfileForm.js";

const editProfilePopup = new Popup(".popup_edit-profile");
const profileForm = new ProfileForm('.profile-form');

class Profile {

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
    this._nameElement = this._element.querySelector('.profile__info-name');
    this._occupationElement = this._element.querySelector('.profile__info-occupation');
    this._editButtonElement = this._element.querySelector('.profile__edit-btn');
    this._editButtonElement.addEventListener( 'click', () => this._handleEditButtonClick());
  }

  _render() {
    console.log(`RENDER: Profile with model: ${JSON.stringify(this._profile)}`);
    this._nameElement.textContent = this._profile.name;
    this._occupationElement.textContent = this._profile.occupation;
  }

  _handleEditButtonClick() {
    profileForm.setProfile(this.getProfile());
    // validateForm(editProfileForm);
    editProfilePopup.open();
  }

}

export { Profile };