import { isDefined } from "./../util/predicates.js"

class UserInfo {

  constructor({ nameSelector, occupationSelector, avatarSelector }, handleAvatarClick) {
    this._nameElement = document.querySelector(nameSelector);
    this._occupationElement = document.querySelector(occupationSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._id = null;
    this._handleAvatarClick = handleAvatarClick;
    this._avatarElement.addEventListener('click', (e) => this._handleAvatarClick(this._avatarElement.src));
  }

  getUserInfo() {
    return {
      id: this._id,
      avatar: this._avatarElement.src,
      name: this._nameElement.textContent,
      occupation: this._occupationElement.textContent,
    };
  }

  setUserInfo({ _id, name, occupation, avatar }) {
    if ( isDefined(_id) ) {
      this._id = _id;
    }
    if ( isDefined(name) ) {
      this._nameElement.textContent = name;
    }
    if ( isDefined(occupation) ) {
      this._occupationElement.textContent = occupation;
    }
    if ( isDefined(avatar) ) {
      this._avatarElement.src = avatar;
      this._avatarElement.alt = name;
    }
  }
}

export { UserInfo };