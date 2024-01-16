'use strict';

const { getNewId } = require('../utils/getNewId');

let users = [];

const getAll = () => users;

const getById = id => users.find(user => user.id === id);

const create = (name) => {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = (id, name) => {
  const updatedUser = getById(id);

  Object.assign(updatedUser, { name });

  return updatedUser;
};

const remove = (id) => {
  const filteredUsers = users.filter(user => user.id !== id);

  users = filteredUsers;
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  clearUsers,
};
