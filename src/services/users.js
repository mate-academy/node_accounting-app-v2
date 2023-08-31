'use strict';

let users = [];
let currentId = 1;

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => +user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: currentId,
    name,
  };

  users.push(newUser);
  currentId++;

  return newUser;
}

function remove(userId) {
  users = users.filter(user => +user.id !== +userId);
};

function update(userId, name) {
  const user = getById(userId);

  Object.assign(user, { name });

  return user;
}

function removeAll() {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeAll,
};
