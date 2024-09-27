'use strict';

const { getIntegerId } = require('../utils/getIntegerId');

let users = [];

const initializeUsers = () => {
  users = [];
};

const get = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id);
};

const create = ({ name }) => {
  const newUser = {
    id: getIntegerId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  initializeUsers,
  get,
  getById,
  create,
  remove,
  update,
};
