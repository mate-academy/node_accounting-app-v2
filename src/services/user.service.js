'use strict';

const { getId } = require('./getId');

const users = [];

const init = () => {
  users.length = 0;
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
  const index = users.findIndex(expense => expense.id === +id);

  if (index > -1) {
    users.splice(index, 1);
  }
};

module.exports = {
  init,
  getAll,
  getById,
  create,
  update,
  remove,
};
