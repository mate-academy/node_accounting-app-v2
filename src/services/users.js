'use strict';

const { createNewId } = require('../helpers.js');

let users = [];

const resetUsers = () => {
  users = [];
};
const getAll = () => users;
const getById = (id) => {
  const foundUser = users.find(user => user.id === +id);

  return foundUser || null;
};
const create = (name) => {
  const id = createNewId(users);

  const newUser = {
    id,
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

  Object.assign(user, { name });

  return user;
};

const userService = {
  resetUsers,
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = { userService };
