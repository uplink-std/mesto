class Section {

  constructor({ renderer }, containerSelector) {
    this._renderer = renderer.bind(this);
    this._containerSelector = containerSelector;
    this._setElements();
  }

  renderItems(items) {
    this._container.innerHTML = '';
    items.forEach( item => this.addItem(this._renderer(item)) );
  }

  addItem(domElement) {
    this._container.prepend(domElement);
  }

  _setElements() {
    this._container = document.querySelector(this._containerSelector);
  }

}

export { Section };