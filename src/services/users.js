'use strict';

const { generateId } = require('../helpers/idGenerator');

let users = [];

function setInitial() {
  users = [];

  return users;
}

function getAll() {
  return users;
}

function findById(userId) {
  return users.find(user => user.id === +userId) || null;
}

function create(name) {
  const newId = generateId(users);

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update({ id, name }) {
  const user = findById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  setInitial,
  getAll,
  findById,
  create,
  remove,
  update,
};
