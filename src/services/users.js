'use strict';

let users = [];

function init() {
  users = [];
};

function getAll() {
  return users;
};

function getUserById(id) {
  const foundUser = users.find((user) => user.id === id);

  return foundUser || null;
};

function existUser(id) {
  return users.some((user) => user.id === id);
};

function removeUser(id) {
  users = users.filter(user => user.id !== id);
};

function updateUser(user, updatedData) {
  Object.assign(user, updatedData);
};

module.exports = {
  init,
  getAll,
  getUserById,
  existUser,
  removeUser,
  updateUser,
};
