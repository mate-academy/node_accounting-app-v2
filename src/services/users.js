'use strict';

let users = [];

function emptyUsers() {
  users = [];

  return users;
}

function getAll() {
  return users;
}

function findById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const maxId = users.length
    ? Math.max(...users.map(user => user.id)) + 1
    : 0;

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

function update({ id, name }) {
  const user = findById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  emptyUsers,
  getAll,
  findById,
  create,
  remove,
  update,
};
