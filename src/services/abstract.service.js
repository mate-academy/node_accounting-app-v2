class AbstractService {
  constructor() {
    this.collection = [];
  }

  clearCollection() {
    this.collection = [];
  }

  getAll() {
    return this.collection;
  }

  getById(id) {
    return this.collection.find((entity) => entity.id === +id);
  }

  create(data) {
    const entity = Object.assign(data, { id: new Date().getTime() });

    this.collection.push(entity);

    return entity;
  }

  deleteOne(id) {
    const index = this.collection.findIndex((entity) => entity.id === +id);

    if (index === -1) {
      return;
    }

    const [deletedEntity] = this.collection.splice(index, 1);

    return deletedEntity;
  }

  update(id, data) {
    const entity = this.getById(id);

    if (!entity) {
      return;
    }

    return Object.assign(entity, data);
  }

  validateDateTimeString(dateTimeString) {
    const dateTimeRegex =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})?$/;

    return dateTimeString.match(dateTimeRegex);
  }
}

module.exports = AbstractService;
