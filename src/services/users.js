'use strict';

const { generateId } = require('../helpers/generateId');

let users = [];

function setInitialUsers() {
  users = [];
};

function getAllUsers() {
  return users;
};

function getUserById(userId) {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
};

function createUser(name) {
  const newUser = {
    id: generateId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

function removeUser(userId) {
  users = users.filter(user => user.id !== Number(userId));
};

function updateUser(userId, name) {
  const user = getUserById(userId);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  setInitialUsers,
};
