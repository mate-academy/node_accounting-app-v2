'use strict';

let { users } = require('../storeOfData/base');
const { v4: uuidv4 } = require('uuid');
const { uuidToNumber } = require('../entity/uuidToNumber');

function setInitialUsers() {
  users = [];
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: uuidToNumber(uuidv4()),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  setInitialUsers,
  getAll,
  getById,
  create,
  remove,
  update,
};
