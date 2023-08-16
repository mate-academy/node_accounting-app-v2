'use strict';

const { generateId } = require('../helpers/generateId');

let users = [];

function getAll() {
  return users;
}

function getOne(id) {
  return users.find((user) => user.id === Number(id));
}

function createOne(name) {
  const newUser = {
    id: generateId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function updateOne(id, userName) {
  const foundUser = getOne(id);

  foundUser.name = userName;

  return foundUser;
}

function deleteOne(id) {
  users = users.filter((user) => user.id !== Number(id));
}

function deleteAllUsers() {
  users = [];
}

module.exports = {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
  deleteAllUsers,
};
