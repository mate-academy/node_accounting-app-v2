'use strict';

class Users {
  constructor() {
    this.data = [];
  }

  getAll() {
    return this.data;
  }

  create(name) {
    const newUser = {
      id: this.data.length + 1,
      name,
    };

    this.data.push(newUser);

    return newUser;
  }

  getOne(userId) {
    return this.data.find(user => user.id === +userId);
  }

  deleteOne(userId) {
    this.data = this.data.filter(user => user.id !== +userId);
  }

  modifyOne(userId, name) {
    const userToModify = this.getOne(userId);

    Object.assign(userToModify, { name });

    return userToModify;
  }
};

exports.Users = Users;
