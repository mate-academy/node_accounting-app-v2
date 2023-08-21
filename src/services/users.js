'use strict';

const { v4: uuidv4 } = require('uuid');

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  return users.find(user => user.id === userId);
}

function create(name) {
  const randomId = uuidv4();

  const newUser = {
    id: +randomId.replace(/[\D]+/g, ''),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== userId);
}

function update(userId, name) {
  const foundUser = getById(userId);

  Object.assign(foundUser, { name });
}

function deleteAll() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  deleteAll,
};
