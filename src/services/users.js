'use strict';

class Users {
  constructor() {
    this.data = [];
    this.idCounter = 0;
  }

  init() {
    this.data = [];
    this.idCounter = 0;
  }

  getAll() {
    return this.data;
  }

  getById(userId) {
    const foundUser = this.data.find(({ id }) => id === +userId);

    return foundUser || null;
  }

  create(name) {
    this.idCounter++;

    const newUser = {
      id: this.idCounter,
      name,
    };

    this.data.push(newUser);

    return newUser;
  }

  removeById(userId) {
    this.data = this.data.filter(({ id }) => id !== +userId);
  }

  update(user, partsToUpdate) {
    Object.assign(user, partsToUpdate);
  }
}

module.exports.service = new Users();
