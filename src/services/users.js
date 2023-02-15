'use strict';

const { createNewId } = require('../helpers/createNewId');

let users = [];

function setInitialUsers() {
  users = [];
}

function getAll() {
  return users;
};

function addUser(name) {
  const newUser = {
    id: createNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

function removeUser(userId) {
  users = users.filter(user => user.id !== +userId);
};

function updateUser(userId, name) {
  const foundUser = getById(userId);

  const updatedUser = Object.assign(foundUser, { name });

  return updatedUser;
}

module.exports = {
  setInitialUsers,
  getAll,
  addUser,
  getById,
  removeUser,
  updateUser,
};
