'use strict';

const { getNewId } = require('./../helpers/getNewId');

let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id);
};

const create = (name) => {
  const newUser = {
    id: getNewId(users),
    name: name,
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

const clear = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  clear,
};
