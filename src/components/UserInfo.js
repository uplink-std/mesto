class UserInfo {

  constructor({ nameSelector, occupationSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._occupationElement = document.querySelector(occupationSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      occupation: this._occupationElement.textContent
    };
  }

  setUserInfo({ name, occupation }) {
    this._nameElement.textContent = name;
    this._occupationElement.textContent = occupation;
  }
}

export { UserInfo };