'use strict';

const { generateUniqueID } = require('../utils/IdGenerator');

let users = [];

const clearUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users.length > 0 ? users : [];
};

const getUser = (userId) => {
  const findUser = users.find(user => user.id === +userId);

  return findUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const createUser = (name) => {
  const newUser = {
    id: generateUniqueID(users),
    name: name,
  };

  users.push(newUser);

  return newUser;
};

const patchUser = (userId, userName) => {
  const user = getUser(userId);

  user.name = userName;

  return user;
};

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  createUser,
  patchUser,
  clearUsers,
};
