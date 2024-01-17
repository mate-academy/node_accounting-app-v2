'use strict';

const { getNewId } = require('../helpers');

let users = [];

function clearAllUsers() {
  users = [];
}

function getAllUsers() {
  return users;
};

function getUserById(id) {
  return users.find(user => user.id === +id);
}

function createNewUser(name) {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

function deleteUser(id) {
  const filteredUsers = users.filter(user => user.id !== +id);

  users = filteredUsers;
}

function upgradeUser(id, name) {
  const userToUpgrade = getUserById(id);

  Object.assign(userToUpgrade, { name });

  return userToUpgrade;
}

module.exports = {
  getAllUsers,
  clearAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  upgradeUser,
};
