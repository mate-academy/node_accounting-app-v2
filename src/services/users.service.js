'use strict';

const { getNewId } = require('../helpers/getNewId');

let users = [];

function clearAllUsers() {
  users = [];
}

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find(user => user.id === Number(id));
};

function createUser(name) {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function updateUser(id, name) {
  const userToUpdate = getUserById(id);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
}

function removeUser(id) {
  const newUsers = users.filter(user => user.id !== +id);

  users = [...newUsers];
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  clearAllUsers,
};
