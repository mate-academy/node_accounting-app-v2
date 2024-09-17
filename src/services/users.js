'use strict';

const { getMaxId } = require('../utils/getMaxId');

let initialUsers = [];

function getAll() {
  return initialUsers;
};

function getById(id) {
  const searchedUser = initialUsers.find(user => user.id === +id);

  return searchedUser || null;
};

function create(name) {
  const newUser = {
    id: getMaxId(initialUsers) + 1,
    name,
  };

  initialUsers.push(newUser);

  return newUser;
};

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });
};

function remove(id) {
  initialUsers = initialUsers.filter(user => user.id !== +id);
};

function removeAllUsers() {
  initialUsers = [];
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
