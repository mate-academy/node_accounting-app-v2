'use strict';

const {
  getNewId,
} = require('../helper');

let users = [];

const setInitialUsers = () => {
  users = [];
};

class UserService {
  getAll() {
    return users;
  };
  getOne(userId) {
    return users.find(user => +user.id === +userId) || null;
  };
  create(name) {
    const newUser = {
      id: getNewId(users),
      name,
    };

    users.push(newUser);

    return newUser;
  };
  remove(id) {
    users = users.filter((user) => +user.id !== +id);
  };
  update(userId, name) {
    const existingUser = this.getOne(userId);

    Object.assign(existingUser, { name });
  };
}

module.exports = {
  UserService,
  setInitialUsers,
};
