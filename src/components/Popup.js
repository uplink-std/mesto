class Popup {

  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._setElements();
    this._escapeEventListener = this._handleEscClose.bind(this);
  }

  open() {
    this._element.classList.add(popupSelectors.popupOpenClass);
    document.addEventListener( 'keyup', this._escapeEventListener);
  }

  close() {
    document.removeEventListener( 'keyup', this._escapeEventListener);
    this._element.classList.remove(popupSelectors.popupOpenClass);
  }

  setEventListeners() {
    this._addOverlayClickEventListeners();
    this._addCloseButtonEventListeners();
  }

  _setElements() {
    this._element = document.querySelector(this._popupSelector);
    this._closeButton = this._element.querySelector(popupSelectors.popupCloseButton);
    this._popupContainer = this._element.querySelector(popupSelectors.popupContainer);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _addCloseButtonEventListeners() {
    this._closeButton.addEventListener( 'click', () => this.close() );
  }

  _addOverlayClickEventListeners() {
    this._popupContainer.addEventListener( 'mousedown', (event) => {
      event.stopImmediatePropagation();
    });

    this._element.addEventListener( 'mousedown', () => {
      this.close();
    });
  };

}

const popupSelectors = {
  popupCloseButton: '.popup__close-btn',
  popupOpenClass: 'popup_opened',
  popupContainer: '.popup__container',
}

export { Popup };