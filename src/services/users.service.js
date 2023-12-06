'use strict';

const { getNextId } = require('../utils/getNextId');

let users = [];

const getAllUsers = () => users;
const getUserById = (id) => users.find(u => u.id === +id) || null;
const createUser = (name) => {
  const newUser = {
    id: getNextId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};
const deleteUser = (id) => {
  users = users.filter(u => u.id !== +id);
};
const updateUser = (id, name) => {
  const user = getUserById(id);

  if (user) {
    user.name = name;
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
  deleteUser,
  updateUser,
  clearUsers,
};
