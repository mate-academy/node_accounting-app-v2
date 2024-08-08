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
  return users.length !== 0 ? users : [];
};

const getUserById = (id) => {
  return users.find((user) => user.id === id) || null;
};

const removeById = (id) => {
  const newUsers = users.filter((user) => user.id !== id);

  const isRemoved = newUsers.length !== users.length || null;

  users = newUsers;

  return isRemoved;
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
  const searchedUser = users.find((user) => user.id === id);

  const result = searchedUser ? Object.assign(searchedUser, { name }) : null;

  return result;
};

const resetUsers = () => {
  users = [];
};

module.exports = {
  getAll, getUserById, removeById, createUser, updateById, resetUsers,
};
