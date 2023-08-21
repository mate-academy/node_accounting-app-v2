'use strict';

const { createId } = require('../helpers/createId');

let users = [];

function getUsers() {
  return users;
};

function getUser(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

function createUser(name) {
  const newUser = {
    id: createId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

function deleteUser(userId) {
  users = users.filter(user => user.id !== +userId);
};

function updateUser({ id, name }) {
  const user = getUser(id);

  Object.assign(user, { name });

  return user;
};

function deleteAllUsers() {
  users = [];
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  deleteAllUsers,
};
