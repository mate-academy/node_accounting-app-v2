'use strict';

const { createId } = require('../helperFunction/createId');

let users = [];

function setInitialUsers(initialUsers) {
  users = initialUsers;

  return users;
}

function getAll() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function createNewUser(name) {
  const newUser = {
    id: createId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteUser(userId) {
  users = users.filter(user => user.id !== +userId);
}

function updateUserInfo({ id, name }) {
  const userToUpdate = getUserById(id);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
}

module.exports = {
  setInitialUsers,
  getAll,
  getUserById,
  createNewUser,
  deleteUser,
  updateUserInfo,
};
