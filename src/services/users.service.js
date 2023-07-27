'use strict';

const { getNewId } = require('../helpers');
let users = [];

const initUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  const foundUser = users.find(user => user.id === id);

  return foundUser || null;
};

const create = (name) => {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter(user => user.id !== Number(id));
};

const update = ({ id, name }) => {
  const foundUser = getById(id);

  Object.assign(foundUser, { name });

  return foundUser;
};

module.exports = {
  initUsers,
  getAll,
  getById,
  create,
  remove,
  update,
};
