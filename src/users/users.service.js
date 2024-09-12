'use strict';

const { createId } = require('../helpers');
let users = [];

function setInitialUsers() {
  users = [];
}

const usersService = {
  getAll() {
    return users;
  },
  getById(userId) {
    const foundUser = users.find(user => user.id === userId);

    return foundUser || null;
  },
  create(name) {
    const user = {
      name,
    };

    user.id = createId();

    users.push(user);

    return user;
  },
  update(userId, name) {
    const foundUser = users.find(user => user.id === userId);

    foundUser.name = name;

    return foundUser;
  },
  delete(userId) {
    users = users.filter(user => user.id !== userId);
  },
};

module.exports = {
  usersService,
  setInitialUsers,
};
