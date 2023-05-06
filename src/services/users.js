'use strict';

const { getNewId } = require('../helpers/helpers.js');

let users = [];

function clearUsers() {
  users = [];
}

function getUsers() {
  return users;
}

function getUser(id) {
  return users.find(user => user.id === id) || null;
}

function createUser(name) {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(id) {
  users = users.filter(user => user.id !== id);
}

function update({ id, name }) {
  const user = getUser(id);

  Object.assign(user, { name });
}

module.exports = {
  clearUsers,
  update,
  remove,
  getUser,
  getUsers,
  createUser,
};
