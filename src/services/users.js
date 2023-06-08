'use strict';

const { v4: uuidv4 } = require('uuid');

let users = [];

function getAll() {
  return users;
};

function getById(userId) {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

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

module.exports = {
  getAll,
  getById,
  create,
  remove,
};
