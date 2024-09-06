'use strict';

const { generateId } = require('../helper/generateId');

const users = []; // Use const instead of let

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
  const index = users.findIndex((user) => user.id === userId);

  if (index !== -1) {
    users.splice(index, 1);
  }
};

const clearUsers = () => {
  users.splice(0, users.length);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  clearUsers,
};
