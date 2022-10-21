'use strict';

let users = [];
let id = 1;

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id,
    name,
  };

  id++;

  users.push(newUser);

  return newUser;
}

function update(userId, name) {
  const foundUser = getById(userId);

  foundUser.name = name;

  return foundUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== userId);
}

function deleteAll() {
  users = [];
  id = 1;
}

module.exports = {
  getAll,
  getById,
  create,
  deleteAll,
  update,
  remove,
};
