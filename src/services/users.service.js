'use strict';

const { getNewId, findById } = require('../helpers');

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => findById(users, +userId);

const createUser = (name) => {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== +userId);

  return users;
};

const updateUser = (userId, name) => {
  const updatedUser = getUserById(userId);

  Object.assign(updatedUser, { name });

  return updatedUser;
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  clearUsers,
};
