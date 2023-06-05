'use strict';

const { v4: uuidv4 } = require('uuid');

let users = [];

function getAllUsers() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function createUser(name) {
  const newUser = {
    id: parseInt(uuidv4(), 16),
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  users = users.filter(user => user.id !== +userId);
}

function updateUser(userId, requestBody) {
  const user = getUserById(userId);

  Object.assign(user, requestBody);
}

function resetUsers() {
  users = [];
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  resetUsers,
};
