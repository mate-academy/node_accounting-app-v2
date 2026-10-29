'use strict';

let users = [];
let nextId = 1;

function reset() {
  users = [];
  nextId = 1;
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id);
}

function create(name) {
  const user = {
    id: nextId,
    name,
  };

  users.push(user);
  nextId++;

  return user;
}

function update(id, name) {
  const user = getById(id);

  if (!user) {
    return undefined;
  }

  user.name = name;

  return user;
}

function remove(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);

  return true;
}

module.exports = {
  reset,
  getAll,
  getById,
  create,
  update,
  remove,
};
