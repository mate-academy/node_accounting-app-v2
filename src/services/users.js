'use strict';

let users = [];

function getUsers() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function createUser(name) {
  const newUser = {
    id: Math.max(0, ...users.map(({ id }) => id + 1)),
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  users = users.filter((user) => user.id !== +userId);
}

function updateUser({ id, name }) {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
}

function initUsers() {
  users = [];
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  initUsers,
};
