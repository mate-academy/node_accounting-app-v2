'use strict';

const { v4: uuidv4 } = require('uuid');

let users = [];

const getAll = () => users;

const getById = (userId) => users
  .find(user => user.id === userId) || null;

const create = (name) => {
  const id = parseInt(uuidv4(), 16);

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
