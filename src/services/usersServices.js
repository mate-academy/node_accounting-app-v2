'use strict';

const { uniqueUserId } = require('../helpers/helpers');

let users = [];

function getAll() {
  return users;
};

function getById(id) {
  return users.find(user => user.id === +id);
};

function create(name) {
  const id = uniqueUserId('user');

  users.push({
    id, name,
  });

  return {
    id, name,
  };
};

function remove(id) {
  users = users.filter(user => user.id !== Number(id));
};

function update({ id, name }) {
  const foundUser = getById(id);

  return Object.assign(foundUser, {
    name,
  });
};

function removeAll() {
  users = [];
};

module.exports = {
  getAll, getById, create, remove, update, removeAll,
};
