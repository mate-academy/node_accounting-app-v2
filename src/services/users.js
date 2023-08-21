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
  const newUser = {
    id: +new Date(),
    name: name,
  };

  users.push(newUser);

  return newUser;
}

module.exports = {
  getAll, getById, remove, create, setFilteredUsers, clearAll,
};
