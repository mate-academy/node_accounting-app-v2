'use strict';

// eslint-disable-next-line prefer-const
let users = [];
let id = 1;

function initUsers() {
  users = [];
}

function getUsers() {
  return users;
}

function getUser(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser;
}

function createUser(name) {
  const newUser = {
    id,
    name,
  };

  id++;

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  users = users.filter((user) => user.id !== userId);
}

function updateOneUser(user, updateData) {
  Object.assign(user, updateData);
}

module.exports = {
  createUser,
  updateOneUser,
  initUsers,
  getUsers,
  removeUser,
  getUser,
};
