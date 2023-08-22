'use strict';

const { generateId } = require('../utils/generateId');

let users = [];

function getAll() {
  return users;
}

function getById(id) {
  const foundUser = users.find(user => user.id === +id);

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

function update({ id, name }) {
  const foundUser = getById(id);

  Object.assign(foundUser, { name });

  return foundUser;
}

function remove(id) {
  users = users.filter(user => user.id !== +id);
}

function deleteAllUsers() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  deleteAllUsers,
};
