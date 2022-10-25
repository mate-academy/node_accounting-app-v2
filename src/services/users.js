'use strict';

let users = [];

function getAll() {
  return users;
}

function init() {
  users = [];
}

function findById(id) {
  return users.find(user => user.id === id);
}

function exist(id) {
  return users.some(user => user.id === id);
}

function add(expense) {
  users.push(expense);
}

function remove(id) {
  users = users.filter(user => user.id !== id);
}

function update(userId, updateData) {
  const userToUpdate = users.find(user => user.id === userId);

  Object.assign(userToUpdate, updateData);
}

module.exports = {
  getAll,
  init,
  add,
  remove,
  findById,
  update,
  exist,
};
