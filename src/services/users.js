'use strict';

const { utils } = require('./utils');

class UsersService {
  constructor() {
    this.users = [];
    this.nextUserId = 1;
  }

  isValidUserBody(userBody, chekEvery = false) {
    const userKeys = [
      'name',
    ];

    const userKeysToCheck = Object.keys(userBody);

    if (
      !userKeysToCheck.length
      || !userKeysToCheck.every(key => userKeys.includes(key))
    ) {
      return false;
    }

    if (
      chekEvery
      && !userKeys.every(key => userKeysToCheck.includes(key))
    ) {
      return false;
    }

    return true;
  }

  addUser(name) {
    const newUser = {
      id: this.nextUserId++,
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(userId) {
    const foundUser = utils.getItemById(this.users, userId);

    return foundUser || null;
  }

  deletUserById(userId) {
    const beforeUsersCount = this.users.length;

    this.users = utils.deleteItemById(this.users, userId);

    return this.users.length < beforeUsersCount;
  }

  updateUserById(userId, newData) {
    const foundUser = utils.getItemById(this.users, userId);

    if (!foundUser) {
      return null;
    }

    Object.assign(foundUser, newData);

    return foundUser;
  }
};

module.exports = { UsersService };
