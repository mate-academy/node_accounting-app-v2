'use strict';

const { getNewId } = require('../utils/getNewId.js');

let users = [];

const resetUsers = () => users = [];

const getAll = () => users;

const getById = (id) => (
  users.find(user => user.id === id)
);

const create = (name) => {
  const newUserId = getNewId(users);
  const newUser = {
    id: newUserId,
    name,
  };

  users = [...users, newUser];

  return newUser;
};

const remove = (id) => {
  const newUsers = users.filter(user => user.id !== id);

  users = newUsers;
};

const patch = (id, newName) => {
  const userToUpdate = users.find(user => user.id === id);

  userToUpdate.name = newName;

  return userToUpdate;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  patch,
  resetUsers,
};
