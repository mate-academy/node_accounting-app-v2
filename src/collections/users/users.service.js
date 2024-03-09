'use strict';

let users = [];

function clearAll() {
  users = [];
}

function getAll() {
  return users;
}

function getOne(id) {
  return users.find(user => user.id === id);
}

function add(user) {
  const id = Math.max(...users.map(u => u.id), -1) + 1;
  const newUser = { ...user, id };

  users.push(newUser);

  return newUser;
}

function remove(id) {
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return false;
  }

  users.splice(userIndex, 1);

  return true;
}

function update(userToUpdate) {
  const userIndex = users.findIndex(user => user.id === userToUpdate.id);

  if (userIndex === -1) {
    return false;
  }

  users.splice(userIndex, 1, userToUpdate);

  return true;
}

module.exports = { getAll, getOne, add, remove, update, clearAll };
