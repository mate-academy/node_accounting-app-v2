'use strict';

const { generateUniqueId } = require('../utils/generateUniqueId');

let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

const create = (name) => {
  const user = {
    id: generateUniqueId(),
    name,
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = ({ parsedId, name }) => {
  const user = getById(parsedId);

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
