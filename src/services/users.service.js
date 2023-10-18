'use strict';

const { getNextId } = require('./../helpers');

let users = [];

const getAll = () => {
  return users;
};

const get = (userId) => {
  return users.find(({ id }) => id === userId) || null;
};

const create = (name) => {
  const user = {
    id: getNextId(users),
    name,
  };

  users.push(user);

  return user;
};

const update = (userId, name) => {
  const updatedUser = {
    id: userId,
    name,
  };

  users = users.map(user => {
    return user.id === userId
      ? updatedUser
      : user;
  });

  return updatedUser;
};

const remove = (userId) => {
  users = users.filter(({ id }) => id !== userId);
};

const exists = (userId) => {
  return users.some(({ id }) => id === userId);
};

const clear = () => {
  users = [];
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  exists,
  clear,
};
