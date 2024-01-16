'use strict';

const { getNewId } = require('../helpers/getNewId.js');
const { getIndex } = require('../helpers/getIndex.js');

let usersStorage = [];

function getUsers() {
  return usersStorage;
}

function createUser(name) {
  const newUser = {
    id: getNewId(usersStorage),
    name,
  };

  usersStorage.push(newUser);

  return newUser;
}

function getUser(userId) {
  return usersStorage.find(({ id }) => id === userId);
}

function deleteUser(id) {
  const index = getIndex(usersStorage, id);

  if (index >= 0) {
    return usersStorage.splice(index, 1);
  }

  return false;
}

function editUser(id, name) {
  const index = getIndex(usersStorage, id);

  if (index >= 0) {
    usersStorage[index].name = name;

    return usersStorage[index];
  }

  return false;
}

function clearUsersStorage() {
  usersStorage = [];
}

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  editUser,
  clearUsersStorage,
};
