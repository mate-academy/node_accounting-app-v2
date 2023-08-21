'use strict';

let users = [];

function getAll() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find(({ id }) => id === userId);

  return foundUser || null;
}

function createUser(name) {
  const newUser = {
    id: +Date.now(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  users = users.filter(user => user.id !== userId);
}

function updateUser({ id, name }) {
  const currentUser = getUserById(id);

  Object.assign(currentUser, { name });

  return currentUser;
}

module.exports = {
  getAll,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
