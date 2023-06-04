'use strict';

const { getNewId } = require('../utils/utils');

let users = [];

function eraseData() {
  users = [];
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(({ id }) => id === +userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(({ id }) => id !== +userId);
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  eraseData,
};
