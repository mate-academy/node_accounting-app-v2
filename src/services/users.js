'use strict';

let users = [];
let countIdUsers = 1;

function resetAllUsers() {
  users = [];
}

function getAllUsers() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function createNewUser(name) {
  const newUser = {
    id: countIdUsers,
    name,
  };

  users.push(newUser);
  countIdUsers++;

  return newUser;
}

function removeUser(userId) {
  users = users.filter(user => user.id !== +userId);
}

function updateUser({ id, name }) {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  removeUser,
  updateUser,
  resetAllUsers,
};
