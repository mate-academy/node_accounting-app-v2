'use strict';

const { generateId } = require('../utils/generateId');
const { ValidationError } = require('../exceptions/ValidationError');

let users = [];

const initiate = (initialUsers) => {
  users = initialUsers;
};

const getAll = () => users;

const getById = (id) => {
  const userId = Number(id);

  if (isNaN(userId)) {
    throw ValidationError.IncorrectType();
  }

  return users.find(user => user.id === userId) || null;
};

const add = (name) => {
  if (typeof name !== 'string') {
    throw ValidationError.IncorrectType();
  }

  const user = {
    id: generateId(users),
    name,
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  const userId = Number(id);

  users = users.filter(user => user.id !== userId);
};

const update = (id, { name }) => {
  if (typeof name !== 'string') {
    throw ValidationError.IncorrectType();
  }

  const user = getById(id);

  return Object.assign(user, { name });
};

module.exports = {
  initiate,
  add,
  remove,
  getAll,
  getById,
  update,
};
