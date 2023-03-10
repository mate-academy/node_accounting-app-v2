'use strict';

let users = [];

function getEmptyUsers() {
  users = [];
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const newId = Math.max(...users.map(({ id }) => id), 1) + 1;

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update(userId, name) {
  const foundUser = getById(userId);

  Object.assign(foundUser, { name });

  return foundUser;
}

module.exports = {
  getEmptyUsers,
  getAll,
  getById,
  remove,
  update,
  create,
};
