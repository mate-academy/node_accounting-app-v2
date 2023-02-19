'use strict';

const uuid = require('uuid').v4;
const collectionServices = require('./collections');

function getUserById(userId) {
  const foundUser = collectionServices.getCollection().users
    .find(user => user.id === userId);

  return foundUser || null;
}

function createUser(name) {
  const newUser = {
    id: uuid(),
    name: name,
  };

  collectionServices.getCollection().users.push(newUser);

  return newUser;
}

function deleteUser(userId) {
  collectionServices.getCollection().users = getFilteredByIdUseres(userId);
}

function updateUser(userId, name) {
  const foundUser = getUserById(userId);

  Object.assign(foundUser, { name });

  return foundUser;
}

function getFilteredByIdUseres(userId) {
  const filteredUsers = collectionServices.getCollection().users
    .filter(user => user.id !== userId);

  return filteredUsers;
}

module.exports = {
  getUserById,
  getFilteredByIdUseres,
  createUser,
  deleteUser,
  updateUser,
};
