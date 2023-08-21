'use strict';

const { nextId } = require('../utils/nextId');

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(({ id }) => id === userId);

  return foundUser || null;
}

function remove(userId) {
  users = users.filter(({ id }) => id !== userId);
}

function create(name) {
  const newUser = {
    name,
    id: nextId(users),
  };

  users.push(newUser);

  return newUser;
}

function update(name, userId) {
  const foundUser = getById(userId);
  const updatedUser = Object.assign(foundUser, { name });

  return updatedUser;
}

function removeAll() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
  removeAll,
};
