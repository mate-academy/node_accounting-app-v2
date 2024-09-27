'use strict';

const { findMaxID } = require('../utils/createNewID');

let users = [];

function resetUsers() {
  users = [];
}

function getAllUsers() {
  return users;
}

function getByUserId(userId) {
  return users.find(user => user.id === +userId);
}

function create(name) {
  const newUser = {
    id: findMaxID(users) + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update(userId, name) {
  const user = getByUserId(userId);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getAllUsers,
  getByUserId,
  create,
  remove,
  update,
  resetUsers,
};
