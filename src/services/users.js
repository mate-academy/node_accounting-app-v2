'use strict';

class Users {
  constructor() {
    this.users = [];
  }

  getAll() {
    return this.users;
  }

  getUserById(userId) {
    const foundUser = this.users.find(user => user.id === +userId);

    return foundUser || null;
  }

  create(name) {
    const maxId = Math.max(...this.users.map(user => user.id));
    const id = (this.users.length > 0) ? maxId + 1 : 1;

    const newUser = {
      id: id,
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(userId, name) {
    const user = this.getUserById(userId);

    Object.assign(user, { name });
  }

  remove(userId) {
    this.users = this.users.filter(user => user.id !== +userId);
  }
}

module.exports = { Users };
