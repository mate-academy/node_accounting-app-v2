'use strict';

const { userId: generatorId } = require('../helpers/getNextId');

let users = [];

const getAll = () => users;

const getById = (userId) => {
  const foundedUser = users.find(user => user.id === userId);

  return foundedUser || null;
};

const create = (name) => {
  const newUser = {
    id: generatorId.getId(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  const filteredUsers = users.filter(user => user.id !== userId);

  if (users.length === filteredUsers.length) {
    return false;
  }

  users = [...filteredUsers];

  generatorId.addFreeId(userId);

  return true;
};

const update = (userId, params) => {
  const foundedUser = getById(userId);

  if (!foundedUser) {
    return null;
  }

  Object.assign(foundedUser, { ...params });

  return foundedUser;
};

module.exports = {
  getAll,
  getById,
  create,
  removeUser,
  update,
};
