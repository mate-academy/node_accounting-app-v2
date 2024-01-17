'use strict';

const { getMaxId } = require('../helpers');

let usersFromServer = [];

const findAll = () => usersFromServer;

const getById = (id) => (
  usersFromServer.find(user => user.id === id) || null
);

const createOne = (name) => {
  const newUser = {
    id: getMaxId(usersFromServer) + 1,
    name,
  };

  usersFromServer.push(newUser);

  return newUser;
};

const deleteOne = (id) => {
  usersFromServer = usersFromServer.filter(user => user.id !== id);
};

const updateOne = (users, name) => {
  Object.assign(users, { name });

  return users;
};

const setAll = (newUser) => {
  usersFromServer = newUser;
};

const validate = (name) => {
  return typeof name === 'string';
};

const clearUsers = () => {
  usersFromServer = [];
};

module.exports = {
  findAll,
  getById,
  createOne,
  deleteOne,
  updateOne,
  setAll,
  validate,
  clearUsers,
};
