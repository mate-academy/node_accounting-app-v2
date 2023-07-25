'use strict';

const { getNewId } = require('../helpers');

let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  const foundUser = users.find(user => user.id === id);

  return foundUser || null;
};

const create = (name) => {
  const newId = getNewId(users);

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = ({ id, name }) => {
  const user = this.getById(id);

  Object.assign(user, { name });

  return user;
};

const userService = {
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = {
  userService,
};
