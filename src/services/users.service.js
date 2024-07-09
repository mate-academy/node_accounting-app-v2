'use strict';

const { generateId } = require('../helper/generateId');

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  const userId = +id;

  return users.find((user) => user.id === userId);
};

const createUser = (name) => {
  const newUser = {
    id: generateId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

const deleteUser = (id) => {
  const userId = +id;

  users = users.filter((user) => user.id !== userId);
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  clearUsers,
};
