'use strict';

let users = [];
const { getMax } = require('../utils/getMax');

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  return users.find(user => user.id.toString() === userId);
};

const createUser = (name) => {
  const id = getMax(users);

  const user = {
    id,
    name,
  };

  users.push(user);

  return user;
};

const removeUser = (userId) => {
  users = users.filter(({ id }) => id.toString() !== userId);
};

const removeAll = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  removeAll,
};
