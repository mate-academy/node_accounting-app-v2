'use strict';

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(({ id }) => id === userId);

  return foundUser || null;
}

function create(name) {
  const maxId = Math.max(...users.map(({ id }) => id), 0);
  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(({ id }) => id !== userId);
}

function update(user, name) {
  Object.assign(user, { name });
}

module.exports = {
  getAll, getById, create, remove, update,
};
