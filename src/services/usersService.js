'use strict';

const users = [];

function resetUsers() {
  users.length = 0;
}

function getAllUsers() {
  return users;
}

function getUserById(userId) {
  return users.find(user => user.id === userId) || null;
}

function addUser(name) {
  const maxId = users.reduce((max, user) => Math.max(max, user.id), -1);
  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  if (!getUserById(userId)) {
    return false;
  }

  users.splice(users.findIndex(user => user.id === userId), 1);

  return true;
}

function updateUser(userId, name) {
  const foundUser = getUserById(userId);

  if (!foundUser) {
    return foundUser;
  }

  foundUser.name = name;

  return foundUser;
}

module.exports = {
  userService: {
    reset: resetUsers,
    getAll: getAllUsers,
    getById: getUserById,
    addUser,
    removeUser,
    updateUser,
  },
};
