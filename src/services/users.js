'use strict';

const { generateNewId } = require('../utils/generateId');

let users = [];

function setInitialValue(value) {
  users = value;
}

function getAll() {
  return users;
}

function getById(id) {
  const foundUser = users.find(user => user.id === +id);

  return foundUser;
}

function create(name) {
  const id = generateNewId(users);
  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
}

function update({ id, name }) {
  const foundUser = getById(id);

  Object.assign(foundUser, { name });

  return foundUser;
}

function remove(id) {
  users = users.filter(user => user.id !== +id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  setInitialValue,
};
