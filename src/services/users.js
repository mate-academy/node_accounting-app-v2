'use strict';

let users = [];

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === Number(id));
}

function initializeUsers() {
  users = [];
}

function removeUserById(id) {
  users = users.filter((user) => user.id !== Number(id));
}

function add(expense) {
  users.push(expense);
}

function updateUser(user, updateData) {
  Object.assign(user, updateData);
}

module.exports = {
  getAllUsers,
  getUserById,
  initializeUsers,
  removeUserById,
  add,
  updateUser,
};
