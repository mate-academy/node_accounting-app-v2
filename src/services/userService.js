'use strict';

const { generateId } = require('../generateId');

let users = [];

function getAllUsers() {
  return users;
};

function getUserById(userId) {
  return users.find(user => user.id === +userId);
};

function addUser(name) {
  const newUser = {
    id: generateId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

function removeUser(userId) {
  users = users.filter(user => user.id !== +userId);
};

function updateUserInfo(userId, name) {
  const foundUser = getUserById(userId);

  Object.assign(foundUser, { name });

  return foundUser;
};

function clearUsers() {
  users = [];
};

const userService = {
  getAllUsers, getUserById, addUser, removeUser, updateUserInfo, clearUsers,
};

module.exports = { userService };
