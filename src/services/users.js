'use strict';

const { generateRandomId } = require('../helpers/generateRandomId');

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  const foundedUser = users.find(user => user.id === +userId);

  return foundedUser || null;
}

function create(name) {
  const minId = 1;
  const maxId = 1000;

  const newUser = {
    id: generateRandomId(minId, maxId),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update({ userId, name }) {
  const user = getById(userId);

  Object.assign(user, { name });

  return user;
}

function removeAllUsers() {
  users = [];
}

const userService = {
  getAll, getById, create, remove, update, removeAllUsers,
};

module.exports = userService;
