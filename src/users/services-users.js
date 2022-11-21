'use strict';

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  return users.find(user => user.id === +userId);
}

function create(name) {
  const id = users.length > 0
    ? Math.max(...users.map(user => user.id)) + 1
    : 0;
  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteUserById(userId) {
  const previousLength = users.length;

  users = users.filter(user => user.id !== +userId);

  if (users.length === previousLength) {
    return false;
  }

  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  deleteUserById,
};
