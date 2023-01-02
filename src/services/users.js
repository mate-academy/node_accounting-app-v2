'use strict';

let users = [];
let id = 1;

function initUsers() {
  users = [];
}

function exist(userId) {
  return users.some(user => user.id === userId);
}

function getUser(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser;
}

function getUsers() {
  return users;
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

function updateUser(user, updateData) {
  Object.assign(user, updateData);
}

module.exports = {
  createUser,
  updateUser,
  initUsers,
  getUsers,
  removeUser,
  getUser,
  exist,
};
