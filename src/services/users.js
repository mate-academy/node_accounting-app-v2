'use strict';

class Users {
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
      id: newId,
      name,
    };

    this.data.push(newUser);

    return newUser;
  }

  getUserById(userId) {
    return this.data.find(user => user.id === +userId);
  }

  deleteUser(userId) {
    this.data = this.data.filter(user => user.id !== +userId);
  }

  updateUser(userId, name) {
    const foundUser = this.getUserById(userId);

    Object.assign(foundUser, { name });

    return foundUser;
  }
};

exports.Users = Users;
