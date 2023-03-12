'use strict';

const { addUniqueId } = require('../utils/addUniqueId');

let users = [];

const resetUsers = () => {
  users = [];
};

const getAll = () => users;

const getUserById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const addUser = (name) => {
  const newUser = {
    id: addUniqueId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUserById = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const updateUser = (userId, name) => {
  const userToUpdate = getUserById(userId);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

module.exports = {
  resetUsers,
  getAll,
  getUserById,
  addUser,
  removeUserById,
  updateUser,
};
