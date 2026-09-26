/* eslint-disable no-console */
'use strict';

const users = [];
let lastId = 0;

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === +id) || null;
}

function create(name) {
  lastId++;

  const user = { id: lastId, name };

  users.push(user);

  return user;
}

function deleteById(id) {
  const index = users.findIndex((user) => user.id === +id);

  if (index !== -1) {
    users.splice(index, 1);
  }
}

function update(id, { name }) {
  const user = getById(id);

  if (!user) {
    return null;
  }

  user.name = name;

  return user;
}

function resetUsers() {
  users.length = 0;
  lastId = 0;
}

const usersService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  resetUsers,
};

module.exports = {
  usersService,
  getAll,
  getById,
  create,
  update,
  remove: deleteById,
  reset: resetUsers,
};
