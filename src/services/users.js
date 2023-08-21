'use strict';

function getMaxId(array) {
  const ids = array.map(user => user.id);

  return Math.max(...ids);
}

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: getMaxId(users) + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update({ id, name }) {
  const user = getById(id);

  if (!user) {
    return;
  }

  Object.assign(user, { name });

  return user;
}

function clearUsers() {
  users = [];
}

module.exports = {
  getAll, getById, create, remove, update, clearUsers,
};
