'use strict';

// const { v4 } = require('uuid');

const newUserId = () => {
  let counter = 1;

  return () => counter++;
};

const getId = newUserId();

let users = [];

function clear() {
  users = [];
}

function getAll() {
  return users;
}

function getById(userId) {
  return users.find((user) => user.id === +userId) || null;
}

function addNew(name) {
  const newUser = {
    id: getId(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter((user) => user.id !== +userId);
}

function change(userId, newName) {
  users.find((user) => user.id === +userId).name = newName;
}

module.exports = {
  getAll,
  getById,
  addNew,
  remove,
  change,
  clear,
};
