'use strict';

let users = [];
let lastId = 0;

function reset() {
  users = [];
  lastId = 0;
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id) || null;
}

function create(name) {
  lastId++;

  const user = {
    id: lastId,
    name,
  };

  users.push(user);

  return user;
}

function update(id, { name }) {
  const user = getById(id);

  if (!user) {
    return null;
  }

  user.name = name;

  return user;
}

function remove(id) {
  users = users.filter((user) => user.id !== id);
}

module.exports = {
  reset,
  getAll,
  getById,
  create,
  update,
  remove,
};
