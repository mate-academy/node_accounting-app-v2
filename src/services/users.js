'use strict';

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const userIds = users.map(user => user.id);

  const maxId = Math.max(...userIds, 0) + 1;

  const newUser = {
    id: maxId,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update(userId, newName) {
  const foundUser = getById(userId);

  Object.assign(foundUser, { name: newName });

  return foundUser;
}

function clear() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  clear,
};
