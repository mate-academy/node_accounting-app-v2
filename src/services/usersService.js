'use strict';

let users = [{ 'id': 1 }];
const { getItemById } = require('../utils/getItemById');
const { deleteItemById } = require('../utils/deleteItemById');
const { updateItem } = require('../utils/updateItem');
const { generateId } = require('../utils/generateId');

function resetUsers() {
  users = [];
}

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return getItemById(users, id);
}

function createUser(data) {
  const id = generateId();
  const createdUser = {
    id,
    ...data,
  };

  users.push(createdUser);

  return createdUser;
}

function deleteUser(userId) {
  users = deleteItemById(users, userId);
}

function updateUser(data) {
  return updateItem(users, data);
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUser,
  resetUsers,
};
