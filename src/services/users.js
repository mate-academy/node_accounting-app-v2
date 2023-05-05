'use strict';

class UsersService {
  constructor() {
    this.users = [];
    this.lastUserId = 0;
  }

  resetData() {
    this.users = [];
    this.lastUserId = 0;
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(userId) {
    return this.users.find(({ id }) => id === userId) || null;
  }

  addUser(userName) {
    this.lastUserId++;

    const newUser = {
      name: userName,
      id: this.lastUserId,
    };

    this.users.push(newUser);

    return newUser;
  }

  removeUser(userId) {
    this.users = this.users.filter(({ id }) => id !== +userId);
  }

  updateUser(userId, name) {
    const userToUpdate = this.getUserById(userId);

    Object.assign(userToUpdate, { name });

    return userToUpdate;
  }
}

module.exports = {
  usersService: new UsersService(),
};
