
'use strict';

const generateUniqueId = require('generate-unique-id');

let users = [];

function init() {
  users = [];
};

function getAll() {
  return users;
};

function getUserById(userId) {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
}

function createUser(name) {
  const newUser = {
    id: Number(generateUniqueId({
      length: 16,
      useLetters: false,
    })),
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  users = users.filter(user => user.id !== Number(userId));
};

function updateUser({ id, name }) {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getUserById,
  createUser,
  removeUser,
  updateUser,
  init,
  getAll,
};
