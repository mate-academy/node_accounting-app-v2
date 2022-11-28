'use strict';

class User {
  constructor() {
    this.users = [];
  }

  init() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  getUser(userId) {
    return this.users.find((user) => user.id === +userId);
  }

  createUser(name) {
    const maxId = Math.max(...this.users.map((user) => user.id), 0);

    const newUser = {
      id: maxId + 1,
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  updateUser(userId, name) {
    const foundUser = this.getUser(userId);

    Object.assign(foundUser, { name });

    return foundUser;
  }

  deleteUser(userId) {
    this.users = this.users.filter((user) => user.id !== +userId);
  }
}

const usersService = new User();

module.exports = { usersService };
