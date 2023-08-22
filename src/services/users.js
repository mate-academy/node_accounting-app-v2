'use strict';

const { generateId } = require('../utils.js');

let users = [];

function getAllUsers() {
  return users;
}

function getUserById(userId) {
  return users.find((user) => user.id === +userId) || null;
}

function createUser(name) {
  const newUser = {
    name,
    id: generateId(users),
  };

  users.push(newUser);

  return newUser;
}

function deleteUser(userId) {
  users = users.filter((user) => user.id !== +userId);
}

function updateUser({ userId, name }) {
  const foundUser = getUserById(userId);

  Object.assign(foundUser, { name });

  return foundUser;
}

function removeAll() {
  users = [];
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  removeAll,
};
