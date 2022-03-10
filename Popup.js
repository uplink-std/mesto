const popupSelectors = {
  popupCloseButton: '.popup__close-btn',
  popupOpenClass: 'popup_opened',
  popupContainer: '.popup__container',
}

class Popup {

  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._setupCloseButton();
    this._setupPopupOverlay();
  }

  open() {
    this._popupElement.classList.add(popupSelectors.popupOpenClass);
    this._handleEscapeEvent = (e) => this._closePopupOnEscapePress(e);

    document.addEventListener( 'keyup', this._handleEscapeEvent);
  }

  close() {
    document.removeEventListener( 'keyup', this._handleEscapeEvent);
    this._popupElement.classList.remove(popupSelectors.popupOpenClass);
  }

  _setupCloseButton() {
    const closeButton = this._popupElement.querySelector(popupSelectors.popupCloseButton);
    closeButton.addEventListener( 'click', () => this.close() );
  }

  _setupPopupOverlay() {
    const popupContainer = this._popupElement.querySelector(popupSelectors.popupContainer);
    popupContainer.addEventListener( 'mousedown', (event) => {
      event.stopImmediatePropagation();
    });

    this._popupElement.addEventListener( 'mousedown', () => {
      this.close();
    });
  };

  _closePopupOnEscapePress(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}

export { Popup };
