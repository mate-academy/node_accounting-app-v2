'use strict';

const generateId = require('../utils/generateId.js');

let users = [];

const getInitialUsers = () => {
  users = [];

  return users;
};

function getUsers() {
  return users;
}

function getUserById(id) {
  const foundUser = users.find(user => user.id === Number(id));

  return foundUser || null;
}

function createUser(name) {
  const newUser = {
    id: generateId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(id) {
  users = users.filter(user => user.id !== Number(id));
}

function updateUser({ id, name }) {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  getInitialUsers,
};
