'use strict';

const { getId } = require('../libs/helpers');

let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

const create = (data) => {
  const id = getId(users);

  const newUser = {
    id,
    ...data,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAll, getById, create, remove, update,
};
