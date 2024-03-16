'use strict';

const { generateItem } = require('../utils/generateItem');

const users = [];

function restart() {
  users.length = 0;
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find((currentUser) => currentUser.id === id);
}

function create(name) {
  const user = generateItem({ name });

  users.push(user);

  return user;
}

function remove(id) {
  const index = users.findIndex((currentUser) => currentUser.id === id);

  if (index === -1) {
    return null;
  }

  return users.splice(index, 1);
}

function update(id, name) {
  const user = users.find((currentUser) => currentUser.id === id);

  if (!user) {
    return null;
  }

  user.name = name;

  return user;
}

module.exports = {
  restart,
  getAll,
  getById,
  create,
  remove,
  update,
};
