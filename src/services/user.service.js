'use strict';

const { v4: uuidv4 } = require('uuid');

let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

const create = (name) => {
  const user = {
    id: uuidv4(),
    name,
  };

  users.push(user);

  return getAll();
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, {
    name,
  });

  return user;
};

const remove = (id) => {
  const newUser = users.filter(user => user.id !== id);

  users = newUser;
};

module.exports.userService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
