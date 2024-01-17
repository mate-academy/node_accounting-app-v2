'use strict';

const { getMaxId } = require('../helpers/userValidation');

let usersFromServer = [];

const findAll = () => usersFromServer;

const getById = (id) => (
  usersFromServer.find(user => user.id === id) || null
);

const create = (name) => {
  const newUser = {
    id: getMaxId(usersFromServer) + 1,
    name,
  };

  usersFromServer.push(newUser);

  return newUser;
};

const remove = (id) => {
  usersFromServer = usersFromServer.filter(user => user.id !== id);
};

const update = (users, name) => {
  Object.assign(users, { name });

  return users;
};

const setAll = (newUser) => {
  usersFromServer = newUser;
};

const clearUsers = () => {
  usersFromServer = [];
};

module.exports = {
  findAll,
  getById,
  create,
  remove,
  update,
  setAll,
  clearUsers,
};
