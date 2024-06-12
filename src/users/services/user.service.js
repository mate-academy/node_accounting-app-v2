'use strict';

const { getNewId } = require('../../getNewId');

let users = [];

function clearUsers() {
  users = [];
}

function getUsers() {
  return users;
}

function getOneUser(id) {
  return users.find(user => user.id === +id);
}

function deleteUser(id) {
  users = users.filter(user => user.id !== +id);
}

function createUser(name) {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function updateUser(userToUpdate, requestBody) {
  const {
    name,
  } = requestBody;

  userToUpdate.name = name;

  return userToUpdate;
}

const services = {
  clearUsers,
  getUsers,
  getOneUser,
  deleteUser,
  createUser,
  updateUser,
};

module.exports = {
  services,
};
