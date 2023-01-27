'use strict';

let users = [];

function resetState() {
  users = [];
}

function getAll() {
  return users;
}

function getBy(id) {
  return users.find(user => user.id === +id) || null;
}

function create(name) {
  const id = users.length > 0
    ? (Math.max(...users.map(user => +user.id)) + 1)
    : 1;

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(id) {
  users = users.filter(user => user.id !== +id);
}

function update({ id, name }) {
  const user = getBy(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  resetState,
  getAll,
  getBy,
  create,
  remove,
  update,
};
