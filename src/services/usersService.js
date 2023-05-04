'use strict';

class UserModel {
  constructor() {
    this.users = [];
  }

  reset() {
    this.users = [];
  }

  getAll() {
    return this.users;
  };

  getById(userId) {
    return this.users.find(user => user.id === userId) || null;
  }

  addUser(name) {
    const maxId = this.users.reduce(
      (max, user) => Math.max(max, user.id),
      -1,
    );
    const newUser = {
      id: maxId + 1,
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  removeUser(userId) {
    if (!this.getById(userId)) {
      return false;
    }

    this.users = this.users.filter(user => user.id !== userId);

    return true;
  }

  updateUser(userId, name) {
    const foundUser = this.getById(userId);

    if (!foundUser) {
      return foundUser;
    }

    Object.assign(foundUser, { name });

    return foundUser;
  }
}

module.exports = {
  userService: new UserModel(),
};
