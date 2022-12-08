'use strict';

const { generateIntId } = require('../utils/generateId.js');

let users = [];

function init() {
  users = [];
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: generateIntId(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update(userId, name) {
  const user = getById(userId);

  user.name = name;

  return user;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  init,
};
