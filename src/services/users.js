'use strict';

const { createId } = require('../utils/createId.js');

let users = [];

const resetUsers = () => {
  users = [];
};

function getUsers() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find(({ id }) => id === Number(userId));

  return foundUser || null;
}

function createUser(name) {
  const newUser = {
    id: createId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  users = users.filter(({ id }) => id !== Number(userId));
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
  resetUsers,
};
