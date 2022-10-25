'use strict';

let users = [];

function init() {
  users = [];
};

function getAll() {
  return users;
};

function findById(id) {
  const detectedUser = users.find(user => user.id === id);

  return detectedUser || null;
};

function exist(id) {
  return users.some(user => user.id === id);
};

function add(expense) {
  users.push(expense);
};

function remove(id) {
  users = users.filter(user => user.id !== id);
};

function update(user, updatedData) {
  Object.assign(user, updatedData);
};

module.exports = {
  add,
  update,
  init,
  getAll,
  remove,
  findById,
  exist,
};
