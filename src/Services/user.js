'use strict';

let users = [];

function init() {
  users = [];
};

function getAll() {
  return users;
};

function getUser(userId) {
  const id = Number(userId);
  const foundUser = users.find(user => user.id === id);

  return foundUser || null;
};

function createUser(name) {
  const newUser = {
    id: Math.floor(Math.random() * 10),
    name,
  };

  users.push(newUser);

  return newUser;
};

function updateUser({ name, userId }) {
  const user = getUser(userId);

  Object.assign(user, { name });

  return user;
};

function deleteUser(userId) {
  users = users.filter(user => user.id !== +userId);

  return users;
};

module.exports = {
  init,
  getAll,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
