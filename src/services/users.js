'use strict';

let users = [];
const { getMaxId } = require('../helpers/helpers');

function getAll() {
  return [...users];
}

function getById(id) {
  if (!id) {
    return null;
  }

  const foundUser = users.find(user => user.id === Number(id));

  return foundUser;
}

function create(name) {
  if (!name) {
    return null;
  }

  const newUser = {
    id: getMaxId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(id) {
  users = users.filter(user => String(user.id) !== id);
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

function resetUsers() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetUsers,
};
