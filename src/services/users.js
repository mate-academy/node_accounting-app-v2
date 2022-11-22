'use strict';

class User {
  constructor() {
    this.data = [];
  }

  getUsers() {
    return this.data;
  }

  createUser(name) {
    const maxId = Math.max(...this.data.map(user => user.id));
    const newId = (this.data.length > 0) ? maxId + 1 : 1;

    const newUser = {
      newId,
      name,
    };

    this.data.push(newUser);

    return newUser;
  }

  getUser(userId) {
    return this.data.find(user => user.id === +userId);
  }

  removeUser(userId) {
    this.data = this.data.filter(user => user.id !== +userId);
  }

  updateUser(userId, name) {
    const toUpdate = this.getOne(userId);

    Object.assign(toUpdate, { name });

    return toUpdate;
  }
}

exports.User = User;
