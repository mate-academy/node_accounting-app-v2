'use strict';

// const uuid = require('uuid');

let nextId = 1;
let users = [];

function getUsers() {
  return users;
}

function getUserById(userId) {
  return users.find(({ id }) => userId === id.toString());
}

function removeUserById(userId) {
  users = users.filter(({ id }) => userId !== id.toString());

  return users;
}

function patchUser(foundUser, changes) {
  Object.assign(foundUser, changes);

  return foundUser;
}

function addUser(data) {
  const newUser = {
    id: nextId++,
    ...data,
  };

  users.push(newUser);

  return newUser;
}

function resetUsers() {
  users = [];
}

module.exports = {
  getUsers,
  getUserById,
  removeUserById,
  patchUser,
  addUser,
  resetUsers,
};
