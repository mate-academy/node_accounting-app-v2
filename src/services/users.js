'use strict';

const { getNewId } = require('../utils/getNewId');

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  const foundUser = users.find(user => String(user.id) === userId);

  return foundUser || null;
};

const createUser = (name) => {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter(user => String(user.id) !== userId);
};

const updateUser = (userId, name) => {
  const user = getUserById(userId);

  if (user) {
    Object.assign(user, { name });
  }

  return user;
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
