class UserInfo {

  constructor({ nameSelector, occupationSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._occupationElement = document.querySelector(occupationSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._id = null;
    this._avatar =  null;
  }

  getUserInfo() {
    return {
      id: this._id,
      avatar: this._avatarElement.src,
      name: this._nameElement.textContent,
      occupation: this._occupationElement.textContent,
    };
  }

  setUserInfo({ id, name, occupation, avatar }) {
    this._id = id;
    this._nameElement.textContent = name;
    this._occupationElement.textContent = occupation;
    this._avatarElement.src = avatar;
    this._avatarElement.alt = name;
  }
}

export { UserInfo };