'use strict';

const helper = require('../../helper');

let users = [];

const getAll = () => {
  return users || [];
};

const clearState = () => {
  users = [];
};

const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

const create = (name) => {
  const user = {
    name,
    id: helper.getId(users),
  };

  users.push(user);

  return user;
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

module.exports = {
  getAll,
  getById: getById,
  create,
  update,
  remove,
  clearState,
};
