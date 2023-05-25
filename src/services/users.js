'use strict';

const { v4: uuid } = require('uuid');

class Users {
  constructor() {
    this.users = [];
  }

  reset() {
    this.users = [];
  }

  getAll() {
    return this.users;
  }

  getById(id) {
    return this.users.find(user => user.id === id);
  }

  create(user) {
    const newUser = {
      id: uuid(),
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  removeById(id) {
    const user = this.getById(id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    this.users = this.users.filter(u => u.id !== id);

    return user;
  }

  updateById(user, partsToUpdate) {
    Object.assign(user, partsToUpdate);
  }
}

const usersService = new Users();

module.exports = { usersService };
