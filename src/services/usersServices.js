'use strict';

const { unicId } = require('../helpers/helpers');

let users = [];

function getAll() {
  return users;
};

function getById(id) {
  const userFound = users.find(user => user.id === Number(id));

  return userFound || null;
};

function create(name) {
  const id = unicId();

  users.push({
    id, name,
  });

  return {
    id, name,
  };
};

function remove(id) {
  users = users.filter(user => user.id !== id);
};

function update({ id, name }) {
  const foundUser = getById(id);

  Object.assign(foundUser, {
    id, name,
  });

  return foundUser;
};

module.exports = {
  getAll, getById, create, remove, update,
};
