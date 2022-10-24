'use strict';

let users = [];

function init() {
  users = [];
};

function getAll() {
  return users;
};

function findById(id) {
  const foundUser = users
    .find((user) => user.id === id);

  return foundUser || null;
};

function exist(id) {
  return users
    .some((user) => user.id === id);
};

function remove(id) {
  users = users
    .filter((user) => user.id !== id);
};

function add(expense) {
  users.push(expense);
};

function update(user, updatedData) {
  Object.assign(user, updatedData);
};

module.exports = {
  init,
  getAll,
  add,
  remove,
  findById,
  update,
  exist,
};
