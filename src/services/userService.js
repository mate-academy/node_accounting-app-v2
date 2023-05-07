'use strict';

const { getMaxIdInArray } = require('../../helpers.js');

class UserService {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  getUserById(userId) {
    return this.users.find(({ id }) => id === +userId);
  }

  addUser(name) {
    const newUser = {
      id: getMaxIdInArray(this.users),
      name,
    };

    this.users = [...this.users, newUser];

    return newUser;
  }

  deleteUser(userId) {
    this.users = this.users.filter(({ id }) => id !== +userId);
  }

  updateUser(userId, name) {
    let userIndex;

    this.users = this.users
      .map((user, i) => {
        if (user.id === +userId) {
          userIndex = i;

          return {
            ...user,
            name,
          };
        }

        return user;
      });

    return this.users[userIndex];
  }
}

module.exports = {
  UserService,
};
