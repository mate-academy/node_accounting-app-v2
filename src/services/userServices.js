'use strict';

let users = [];

function getUsers() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find((user) => user.id === +userId);

  return foundUser || null;
}

function createUser(name) {
  const newUser = {
    id: Math.round(Math.random() * 100),
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteUser(userId) {
  users = users.filter((user) => user.id !== +userId);
}

function updateUser(userId, name) {
  const user = getUserById(userId);

  Object.assign(user, { name });

  return user;
}

function initUsers() {
  users = [];
}

module.exports = {
  getUserById,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  initUsers,
};
