'use strict';

const { getNewId } = require('../helpers/getNewId');

let users = [];

const getAll = () => users;

const getById = (id) => (users.find(user => user.id === id) || null);

const create = (name) => {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = (id, name) => {
  const user = getById(id);

  user.name = name;

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
