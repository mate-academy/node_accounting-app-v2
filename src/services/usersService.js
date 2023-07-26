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
    return users.find(({ id }) => id === +userId) || null;
  };
  create(name) {
    const newUser = {
      id: getNewId(users),
      name,
    };

    users.push(newUser);

    return newUser;
  };
  remove(userId) {
    users = users.filter(({ id }) => id !== +userId);
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
