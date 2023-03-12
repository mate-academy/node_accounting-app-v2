'use strict';

const { createNewId } = require('../utils/createNewId');

let users = [];

const setInitialUsers = (initialUsers) => {
  users = initialUsers;

  return users;
};

const getAll = () => users;

const getUserById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const addNewUser = (name) => {
  if (typeof name !== 'string') {
    throw new Error('Invalid user name');
  }

  const newUser = {
    id: createNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const updateUser = (userId, newName) => {
  const updatedUser = getUserById(userId);

  updatedUser.name = newName;

  return updatedUser;
};

module.exports = {
  setInitialUsers,
  getAll,
  getUserById,
  addNewUser,
  deleteUser,
  updateUser,
};
