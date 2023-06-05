'use strict';

// const { v4: uuidv4 } = require('uuid');
let users = [];
let idUserCounter = 0;

function setDefaultUsers() {
  users = [];
  idUserCounter = 0;
}

function create(name) {
  idUserCounter++;

  const newUser = {
    id: idUserCounter,
    name,
  };

  users.push(newUser);

  return newUser;
}

function getAll() {
  return users;
}

function getById(userId) {
  return users.find((user) => user.id === +userId);
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

function remove(userId) {
  users = users.filter((user) => user.id !== +userId);
}

module.exports = {
  setDefaultUsers,
  create,
  getAll,
  getById,
  update,
  remove,
};
