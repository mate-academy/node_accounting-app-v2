'use strict';

let users = [];

function clearAll() {
  users = [];
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);

  return users;
}

function setFilteredUsers(filtered) {
  users = [...filtered];
}

function create(name) {
  const newId = users.length > 0
    ? Math.max(...users.map(user => user.id)) + 1
    : 1000;

  const newUser = {
    id: newId,
    name: name,
  };

  users.push(newUser);

  return newUser;
}

module.exports = {
  getAll, getById, remove, create, setFilteredUsers, clearAll,
};
