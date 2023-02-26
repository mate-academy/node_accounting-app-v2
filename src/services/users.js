'use strict';

const { getLargestId } = require('../utils/getLargestId');
let users = [];

const setInitial = () => {
  users = [];
};

const getAll = () => users;

const getUserById = (userId) => {
  return users.find(user => user.id === +userId) || null;
};

const addUser = (name) => {
  const newUser = {
    id: getLargestId(users) + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

module.exports = {
  setInitial,
  getAll,
  getUserById,
  addUser,
  deleteUser,
};
