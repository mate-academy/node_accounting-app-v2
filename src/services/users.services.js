'use strict';

const { generateId } = require('../helpers/helpers.js');

/**
 *@typedef {Object} User
 *@property {number} id
 *@property {string} name
 *@type {User[] | []}
 */
let users = [];

const getAll = () => {
  return users;
};

const getUserById = (id, forExpenses) => {
  const searchedUser = users.find((user) => user.id === id);

  if (!searchedUser && !forExpenses) {
    throw new Error('Not found');
  } else if (!searchedUser && forExpenses) {
    throw new Error('Bad request');
  }

  return searchedUser;
};

const removeById = (id) => {
  const newUsers = users.filter((user) => user.id !== id);

  const isRemoved = newUsers.length !== users.length;

  if (!isRemoved) {
    throw new Error('Not found');
  }

  users = newUsers;
};

const createUser = (name) => {
  const newUser = {
    id: generateId(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const updateById = (id, name) => {
  const searchedUser = getUserById(id);

  return Object.assign(searchedUser, { name });
};

const resetUsers = () => {
  users = [];
};

module.exports = {
  getAll,
  getUserById,
  removeById,
  createUser,
  updateById,
  resetUsers,
};
