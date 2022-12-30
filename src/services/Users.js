'use strict';

class Users {
  constructor() {
    this.data = [];
  }

  getAll() {
    return this.data;
  }

  create(name) {
    const maxId = Math.max(...this.data.map(user => user.id));
    const id = (this.data.length > 0) ? maxId + 1 : 1;

    const newUser = {
      id,
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
