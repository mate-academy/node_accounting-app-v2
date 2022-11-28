'use strict';

let users = [];

class UsersService {
  setInitialUsers() {
    users = [];
  }
  createUser(name) {
    const userId = users.length
      ? Math.max(...users.map(user => user.id)) + 1
      : 1;
    const newUser = {
      id: userId,
      name,
    };

    users.push(newUser);

    return newUser;
  }

  getAll() {
    return users;
  }

  getOne(userId) {
    const userData = users
      .find(user => user.id === +userId) || null;

    return userData;
  }

  removeOne(userId) {
    const userData = users.filter(user => user.id !== +userId);
    const hasDeleted = users.length !== userData.length;

    users = userData;

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

module.exports = { UsersService };
