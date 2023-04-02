'use strict';

class UsersService {
  constructor() {
    this.users = [];
  }
  setInitialUsers() {
    this.users = [];
  }
  createUser(name) {
    const userId = this.users.length
      ? Math.max(...this.users.map(user => user.id)) + 1
      : 1;
    const newUser = {
      id: userId,
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  getAll() {
    return this.users;
  }

  getOne(userId) {
    const userData = this.users
      .find(user => user.id === +userId) || null;

    return userData;
  }

  removeOne(userId) {
    const userData = this.users.filter(user => user.id !== +userId);
    const hasDeleted = this.users.length !== userData.length;

    this.users = userData;

    return hasDeleted;
  }

  modifyUser(userId, name) {
    const userData = this.getOne(userId);

    if (userData) {
      Object.assign(userData, { name });
    }

    return userData;
  }
}

const usersService = new UsersService();

module.exports = { usersService };
