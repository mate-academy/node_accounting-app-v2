'use strict';

let users = [];

function getUsers() {
  return users;
}

function getUserById(userId) {
  return users.find(user => user.id === +userId) || null;
}

function removeUser(userId) {
  users = users.filter(user => user.id === userId);
}

function removeAllUsers() {
  users = [];
}

function addUser(userName) {
  const newUser = {
    id: users.length + 1,
    name: userName,
  };

  users.push(newUser);

  return newUser;
}

function updateUser(userId, userName) {
  const foundUser = getUserById(userId);

  foundUser.name = userName;

  return foundUser;
}

module.exports = {
  getUsers,
  getUserById,
  removeUser,
  removeAllUsers,
  addUser,
  updateUser,
};
