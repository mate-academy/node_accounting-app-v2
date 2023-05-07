'use strict';

let users = [];

function getAll() {
  return users;
}

function removeAll() {
  users = [];
}

function create(name) {
  const maxId = users.length ? users.length : 0;

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function getById(userId) {
  const foundUser = users.find(({ id }) => id === +userId);

  return foundUser || null;
}

function remove(userId) {
  users = users.filter(({ id }) => id !== +userId);
}

function update(userId, name) {
  const user = getById(userId);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  removeAll,
  getAll,
  getById,
  create,
  remove,
  update,
};
