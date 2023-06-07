'use strict';

const { getMaxId } = require('./utils');

let users = [];

const resetUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const addUser = (name) => {
  const newId = getMaxId();

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const updateUser = (userId, name) => {
  const foundUser = getById(userId);

  foundUser.name = name;

  return foundUser;
};

module.exports = {
  resetUsers,
  getAll,
  getById,
  addUser,
  removeUser,
  updateUser,
};
