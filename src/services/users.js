'use strict';

const { getMaxId } = require('../utils/getMaxId.js');
let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  return users.find(({ id }) => userId === id.toString());
}

function addUser(name) {
  const newUser = {
    id: getMaxId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(({ id }) => userId !== id.toString());
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

function reset() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  addUser,
  remove,
  update,
  reset,
};
