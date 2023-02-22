'use strict';

const getId = require('../helpers/maxId').getId;

let users = [];

function setInitialUsers() {
  users = [];
}

function getAll() {
  return users;
}

function getUserById(userId) {
  const wantedUser = users.find(user => user.id === Number(userId));

  return wantedUser || null;
}

function createUser(name) {
  const newUser = {
    id: getId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function patchUser(user, name) {
  Object.assign(user, { name });
}

function deleteUser(userId) {
  users = users.filter(user => user.id !== Number(userId));
}

module.exports = {
  setInitialUsers,
  getAll,
  getUserById,
  createUser,
  patchUser,
  deleteUser,
};
