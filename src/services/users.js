'use strict';

const { getMaxId } = require('../utils/helpers');

let users = [];

function getAll() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
}

function create(name) {
  const id = getMaxId(users);

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== Number(userId));
}

function update(id, name) {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
}

function reset() {
  users = [];
}

module.exports = {
  getAll,
  getUserById,
  create,
  remove,
  update,
  reset,
};
