'use strict';

let users = [];

function getAll() {
  return users;
};

function getById(userId) {
  return users.find(user => user.id === userId);
}

function add(user) {
  users.push(user);
}

function remove(userId) {
  users = users.filter(user => user.id !== userId);
}

function update(user, data) {
  Object.assign(user, data);
}

function clear() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  clear,
};
