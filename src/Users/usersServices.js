'use strict';

const { v4: uuid } = require('uuid');

let users = [];

const getAll = () => users;

const getById = (userId) => {
  return users.find(user => user.id === +userId);
};

const create = (name) => {
  const newUser = {
    id: uuid(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
