'use strict';

const { v4 } = require('uuid');

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  return users.find((user) => user.id === userId) || null;
}

function addNew(name) {
  const newUser = {
    id: v4(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter((user) => user.id !== userId);
}

function change(userId, newName) {
  users.find((user) => user.id === userId).name = newName;
}

module.exports = {
  getAll,
  getById,
  addNew,
  remove,
  change,
};
