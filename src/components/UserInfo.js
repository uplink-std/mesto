class UserInfo {

  constructor({ nameSelector, occupationSelector }) {
    this._nameSelector = nameSelector;
    this._occupationSelector = occupationSelector;
    this._setElements();
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

  _setElements() {
    this._nameElement = document.querySelector(this._nameSelector);
    this._occupationElement = document.querySelector(this._occupationSelector);
  }
}

export { UserInfo };