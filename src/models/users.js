'use strict';

const { generateId } = require('../functions/generateId');

class Users {
  constructor() {
    this.data = [];
  }

  init() {
    this.data = [];
  }

  getAll() {
    return this.data;
  }

  getById(id) {
    const foundUser = this.data.find(user => user.id === +id);

    return foundUser || null;
  }

  create(name) {
    const newUser = {
      id: generateId(),
      name,
    };

    this.data.push(newUser);

    return newUser;
  }

  delete(id) {
    this.data = this.data.filter(user => user.id !== +id);
  }

  update(user, name) {
    Object.assign(user, { name });
  }
}

module.exports = { users: new Users() };
