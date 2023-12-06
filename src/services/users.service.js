'use strict';

const { getNewId } = require('../utils/getNewId');

let users = [];

const resetUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(u => u.id === Number(id)) || null;
};

const create = (name) => {
  const newUser = {
    id: getNewId(users) + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter(user => user.id !== +id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  resetUsers,
};
