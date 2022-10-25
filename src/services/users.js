'use strict';

let users = [];

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

function getAll() {
  return users;
}

function initUsers() {
  users = [];
}

function getUserById(userId) {
  const foundUser = users.find(
    (user) => user.id === +userId
  );

  return foundUser || null;
}

function createUser(name) {
  const newUser = {
    id: uniqueID(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  const filteredUsers = users.filter((user) => user.id !== +userId);

  users = filteredUsers;
}

function updateUser({ id, name }) {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  initUsers,
  getAll,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
