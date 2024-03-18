'use strict';

const { getNewId } = require('../helpers/idsGenerator');

const users = [];

function clearAll() {
  users.length = 0;
}

function getAll() {
  return users;
}

function getById(id) {
  const user = users.find((pers) => pers.id === id) || null;

  return user;
}

function create(name) {
  const user = {
    id: getNewId(users),
    name,
  };

  users.push(user);

  return user;
}

function update({ id, name }) {
  const user = getById(+id);

  Object.assign(user, { name });

  return user;
}

function remove(id) {
  const index = users.findIndex((u) => u.id === id);

  users.splice(index, 1);
}

module.exports = {
  clearAll,
  getAll,
  getById,
  create,
  remove,
  update,
};
