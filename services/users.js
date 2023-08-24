'use strict';

const { generateId } = require('../utils/idGenerator');

const users = [];

const getAll = () => users;

const getUserById = (userId) => {
  return users.find(({ id }) => id === +userId);
};

const createUser = (name) => {
  const user = {
    id: generateId(),
    name,
  };

  users.push(user);

  return user;
};

const updateUser = ({ userId, name }) => {
  const foundedUser = getUserById(+userId);

  Object.assign(foundedUser, { name });
};

const removeUser = (userId) => {
  const foundedIndex = users.findIndex(({ id }) => id === +userId);

  users.splice(foundedIndex, 1);
};

const clearUsers = () => {
  users.length = 0;
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  clearUsers,
};
