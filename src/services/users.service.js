'use strict';

const { idGenerator } = require('../utils/idGenerator');

let users = [];

const getIsUserExist = (id) => {
  return users.some(user => user.id === id);
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

const add = (name) => {
  const preparedUser = {
    id: idGenerator(users),
    name,
  };

  users.push(preparedUser);

  return preparedUser;
};

const update = (id, nameToUpdate) => {
  const userToUpdate = users.find(user => user.id === id);

  if (!userToUpdate) {
    return;
  }

  Object.assign(userToUpdate, { name: nameToUpdate });

  return userToUpdate;
};

const remove = (id) => {
  const getIsUserExists = users.some(user => user.id === id);

  if (!getIsUserExists) {
    return false;
  }

  users = users.filter(user => user.id !== id);

  return true;
};

const removeAll = () => {
  users = [];
};

module.exports = {
  getIsUserExist,
  getAll,
  getById,
  add,
  update,
  remove,
  removeAll,
};
