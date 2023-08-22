'use strict';

const { getNewId } = require('../utils');

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  return users.find(user => user.id === userId);
}

function create(name) {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

function remove(userId) {
  users = users.filter(user => user.id !== userId);
}

function removeAll() {
  users = [];
}

module.exports = {
  getAll, getById, create, update, remove, removeAll,
};
