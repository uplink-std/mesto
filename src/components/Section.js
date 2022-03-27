class Section {

  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer.bind(this);
    this._containerSelector = containerSelector;
    this._setElements();
  }

  renderItems() {
    this._container.innerHTML = '';
    this._items.forEach( (item) => this._renderer(item) );
  }

  addItem(domElement) {
    this._container.prepend(domElement);
  }

  _setElements() {
    this._container = document.querySelector(this._containerSelector);
  }

}

export { Section };