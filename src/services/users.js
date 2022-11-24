'use strict';

class Users {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  setUsers(newUserName) {
    let id = 0;

    if (this.users.length !== 0) {
      id = this.users[this.users.length - 1].id + 1;
    }

    const newUser = {
      id,
      name: newUserName,
    };

    this.users.push(newUser);

    return newUser;
  }

  getUserById(userId) {
    return this.users.find(user => user.id === +userId);
  }

  deleteUser(userId) {
    const prevLen = this.users.length;

    this.users = this.users.filter(user => user.id !== +userId);

    return prevLen !== this.users.length;
  }

  updateUser(userId, newData) {
    const foundUser = this.getUserById(userId);

    if (foundUser) {
      Object.assign(foundUser, newData);

      return foundUser;
    }

    return false;
  }
}

module.exports.Users = Users;
