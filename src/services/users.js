'use strict';

const { v4: uuid } = require('uuid');

let users = [];

const resetStore = () => {
  users = [];
};

const getAll = () => users;

const getById = (id) => users.find((user) => user.id === id) || null;

const create = (name) => {
  const user = { id: uuid(), name };
  users.push(user);
  return user;
};

const deleteById = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return null;
  }

  users.splice(userIndex, 1);
  return true;
};

const update = (id, name) => {
  const user = getById(id);
  if (!user) {
    return null;
  }

  user.name = name;
  return user;
};

module.exports = {
  resetStore,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
