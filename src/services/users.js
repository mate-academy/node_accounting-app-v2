'use strict';

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  return users.find(user => user.id === +userId);
}

function create(name) {
  const newId = users.length > 0
    ? Math.max(...users.map(user => user.id)) + 1
    : 0;

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
  const user = getById(userId);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
