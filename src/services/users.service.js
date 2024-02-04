'use strict';

const commonService = require('./common.service.js');

let users = [];

function clearUsers() {
  users = [];
}

function getUsers() {
  return users;
};

function createUser(name) {
  const user = {
    id: commonService.generateId(users),
    name,
  };

  users.push(user);

  return user;
}

function getUserById(id) {
  const user = commonService.findById(users, id);

  return user;
}

function removeUserById(id) {
  users = users.filter(user => user.id !== +id);
}

function updateName(user, name) {
  Object.assign(user, { name });

  return user;
}

module.exports = {
  clearUsers,
  getUsers,
  createUser,
  getUserById,
  removeUserById,
  updateName,
};
