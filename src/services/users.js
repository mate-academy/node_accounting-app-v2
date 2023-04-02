'use strict';

const { generateId } = require('../utils/generateId');

let users = [];

function init() {
  users = [];
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: generateId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(({ id }) => id !== +userId);
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  init,
  getAll,
  getById,
  create,
  remove,
  update,
};
