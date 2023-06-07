'use strict';

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

  getById(userId) {
    const foundUser = this.users.find(user => Number(userId) === user.id);

    return foundUser || null;
  }

  createUser(name) {
    const newUser = {
      id: Math.random(),
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  removeUser(userId) {
    this.users = this.users
      .filter(user => Number(userId) !== user.id);
  }

  updateById(userId, userName) {
    const user = this.getById(userId);

    Object.assign(user, { name: userName });

    return user;
  }
}

const userServices = new Users();

module.exports = userServices;
