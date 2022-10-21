'use strict';

const { v4: uuidv4 } = require('uuid');

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  const findUser = users.find(user => user.id === userId);

  return findUser || null;
}

function create(name) {
  const newUser = {
    id: uuidv4(),
    name,
  };

  users.push(newUser);
}

function remove(userId) {
  users = users.filter(user => user.id !== userId);
}

function update(userId, name) {
  const user = getById(userId);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
