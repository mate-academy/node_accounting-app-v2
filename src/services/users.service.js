'use strict';

const { idGenerator } = require('./idGenerator');

let users = [];

const isUserExist = (id) => {
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
  const isUserExists = users.some(user => user.id === id);

  if (!isUserExists) {
    return false;
  }

  users = users.filter(user => user.id !== id);

  return true;
};

module.exports = {
  isUserExist,
  getAll,
  getById,
  add,
  update,
  remove,
};
