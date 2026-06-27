class BaseService {
  _items = [];

  static #instances = [];

  constructor() {
    BaseService.#instances.push(this);
  }

  static clearAllInstances() {
    BaseService.#instances.forEach(element => {
      element._items = [];
    });
  }

  createUniqId() {
    return Math.max(0, ...this._items.map(item => item.id)) + 1;
  }

  get() {
    return this._items;
  }

  getById(id) {
    return this._items.find(item => String(item.id) === String(id));
  }

  deleteOne(id) {
    this._items = this._items.filter(item => String(item.id) !== String(id));
  }

  createOne(itemWithoutId) {
    const newItem = { ...itemWithoutId, id: this.createUniqId() };

    this._items.push(newItem);

    return newItem;
  }

  updateOne(item) {
    const findItem = this.getById(item.id);

    if (!findItem) {
      return false;
    }

    const { id, ...userWithoutId } = item;

    Object.assign(findItem, userWithoutId);

    return true;
  }
}

module.exports = BaseService;
