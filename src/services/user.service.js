/* eslint-disable no-shadow */
'use strict';

const newId = require('./index');

const users = [];

const clearUsers = () => {
  users.length = 0;
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  const user = users.find((user) => user.id === +id);

  return user;
};

const createUser = (name) => {
  const user = {
    id: newId.generateID(users),
    name,
  };

  users.push(user);

  return user;
};

const updateUser = (id, name) => {
  const indexToUpdate = users.findIndex((user) => user.id === +id);

  if (indexToUpdate !== -1) {
    users[indexToUpdate].name = name;

    return users[indexToUpdate];
  }

  return null;
};

const deleteUser = (id) => {
  const indexToDelete = users.findIndex((user) => user.id === +id);

  if (indexToDelete !== -1) {
    users.splice(indexToDelete, 1);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  clearUsers,
  createUser,
  deleteUser,
  updateUser,
};
