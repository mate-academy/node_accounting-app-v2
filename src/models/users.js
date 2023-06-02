'use strict';

class UserModel {
  constructor(createId) {
    this.users = [];
    this.createId = createId;
  }

  getUsers() {
    return this.users;
  }

  getUserById(userId) {
    const foundUser = this.users.find(({ id }) => id === Number(userId));

    return foundUser || null;
  }

  createUser(name) {
    const newUser = {
      id: this.createId(this.users),
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  removeUser(userId) {
    this.users = this.users.filter(({ id }) => id !== Number(userId));
  }

  updateUser({ id, name }) {
    const user = this.getUserById(id);

    Object.assign(user, { name });

    return user;
  }

  resetUsers() {
    this.users = [];
  }
}

module.exports = {
  UserModel,
};
