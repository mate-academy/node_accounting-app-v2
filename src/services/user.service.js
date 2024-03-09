'use strict';

const { getId } = require('./getId');

let users;

const init = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  const choosedUser = users.find(user => user.id === +id);

  return choosedUser;
};

const create = (name) => {
  const newUser = {
    id: getId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = ({ id, name }) => {
  return Object.assign(getById(id), { name });
};

const remove = (id) => {
  users = users.filter(user => user.id !== +id);
};

module.exports = {
  init,
  getAll,
  getById,
  create,
  update,
  remove,
};
