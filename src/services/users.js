'use strict';

const { v4: uuidv4 } = require('uuid');

let users = [];
// let count = 0;

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: uuidv4(),
    name,
  };

  users.push(newUser);

  // count++;

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== userId);
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getAll, getById, create, remove, update,
};
