'use strict';

const getUid = require('get-uid');

const users = [];

function getAll() {
  return users;
};

function getById(id) {
  const searchedUser = users.find(user => user.id === +id);

  return searchedUser || null;
};

function create(name) {
  const newUser = {
    id: getUid(),
    name,
  };

  users.push(newUser);

  return newUser;
};

function remove(id) {
  const indexToRemove = users.findIndex(user => user.id === +id);

  if (indexToRemove !== -1) {
    users.splice(indexToRemove, 1);
  }
};

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });
};

function removeAllUsers() {
  users.length = 0;
};

const userServices = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeAllUsers,
};

module.exports = userServices;
