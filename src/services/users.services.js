'use strict';

const { getNewId, findById } = require('../helpers');

let users = [];

const clearUsers = () => {
  users = [];
};

const getAllUsers = () => users;

const getUserById = (userId) => (
  findById(users, Number(userId))
);

const createUser = (name) => {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== Number(userId));

  return users;
};

const updateUser = (userId, name) => {
  const foundUser = getUserById(userId);

  Object.assign(foundUser, { name });

  return foundUser;
};

module.exports = {
  clearUsers,
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
