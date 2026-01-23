const { ent, dbActions } = require('../static/constants');

class DB {
  // creating a new instance of DB
  constructor() {
    this[ent.usr] = [];
    this[ent.exp] = [];
  }

  [dbActions.getOne](entity, id) {
    const found = this[entity].find((el) => el.id === id);

    return found
      ? { ok: true, statusCode: 200, data: found }
      : { ok: false, statusCode: 404, msg: 'Not found' };
  }
  [dbActions.getAll](entity) {
    return { ok: true, statusCode: 200, data: this[entity] };
  }
  [dbActions.post](entity, body) {
    const lastId = this[entity].at(-1)?.id ?? 0;
    const newObj = { id: lastId + 1, ...body };

    if (
      entity === ent.exp &&
      !this[ent.usr].find((el) => el.id === newObj.userId)
    ) {
      return {
        ok: false,
        statusCode: 400,
        msg: `Expense userId doesn't exist`,
      };
    }

    this[entity].push(newObj);

    return { ok: true, statusCode: 201, data: newObj };
  }
  [dbActions.delete](entity, id) {
    const obj = this[entity].find((el) => el.id === id);

    if (!obj) {
      return { ok: false, statusCode: 404, msg: 'Not found' };
    }

    this[entity] = this[entity].filter((el) => el !== obj);

    if (entity === ent.usr) {
      this[ent.exp] = this[ent.exp].filter((el) => el.userId !== id);
    }

    return { ok: true, statusCode: 204 };
  }
  [dbActions.patch](entity, id, body) {
    const index = this[entity].findIndex((el) => el.id === id);

    if (index === -1) {
      return { ok: false, statusCode: 404, msg: 'Not found here' };
    }

    const newObj = { ...this[entity][index], ...body };

    if (
      entity === ent.exp &&
      !this[ent.usr].find((el) => el.id === newObj.userId)
    ) {
      return {
        ok: false,
        statusCode: 400,
        msg: `Expense userId doesn't exist`,
      };
    }

    this[entity][index] = newObj;

    return { ok: true, statusCode: 200, data: newObj };
  }
}

module.exports = { DB };
