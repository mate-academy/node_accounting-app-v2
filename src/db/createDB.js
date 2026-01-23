const { ent } = require('../static/constants');

class DB {
  // creating a new instance of DB
  constructor() {
    this[ent.usr] = [];
    this[ent.exp] = [];
  }

  getOne(entity, id) {
    const found = this[entity].find((el) => el.id === id);

    return found ? { ok: true, data: found } : { ok: false, msg: 'Not found' };
  }
  getAll(entity) {
    return { ok: true, data: this[entity] };
  }
  post(entity, body) {
    const lastId = this[entity].at(-1)?.id ?? 0;
    const newObj = { id: lastId + 1, ...body };

    if (
      entity === ent.exp &&
      !this[ent.usr].find((el) => el.id === newObj.userId)
    ) {
      return { ok: false, msg: `Expense userId doesn't exist` };
    }

    this[entity].push(newObj);

    return { ok: true, data: newObj };
  }
  delete(entity, id) {
    const obj = this[entity].find((el) => el.id === id);

    if (!obj) {
      return { ok: false, msg: 'Not found' };
    }

    this[entity] = this[entity].filter((el) => el !== obj);

    return { ok: true, data: obj };
  }
  patch(entity, id, body) {
    const index = this[entity].findIndex((el) => el.id === id);

    if (index === -1) {
      return { ok: false, msg: 'Not found' };
    }

    const newObj = { ...this[entity][index], ...body };

    this[entity][index] = newObj;

    return { ok: true, data: newObj };
  }
}

module.exports = { DB };
