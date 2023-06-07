'use strict';

const { getNextId } = require('../helpers/helpers');

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  return users.find(user => user.id.toString() === userId);
};

const createUser = (name) => {
  const id = getNextId(users);

  const user = {
    id,
    name,
  };

  users.push(user);

  return user;
};

const updateUser = (userId, name) => {
  const user = getUserById(userId);

  if (user) {
    Object.assign(user, { name });
  }

  return user;
};

const removeUser = (userId) => {
  users = users.filter(({ id }) => id.toString() !== userId);
};

const removeAllUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  removeAllUsers,
};
