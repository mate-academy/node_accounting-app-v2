'use strict';

const { v4: uuidv4 } = require('uuid');

let users = [];

const resetUsers = () => {
  users = [];
};

const getAll = () => users;

const getById = (userId) => users.find(user => user.id === userId) || null;

const removeUser = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const createUser = (userName) => {
  const id = parseInt(uuidv4(), 16);

  const newUser = {
    id,
    name: userName,
  };

  users.push(newUser);

  return newUser;
};

const updateUser = (userId, userName) => {
  const userToUpdate = getById(userId);

  userToUpdate.name = userName;

  return userToUpdate;
};

module.exports = {
  resetUsers,
  getAll,
  getById,
  removeUser,
  createUser,
  updateUser,
};
