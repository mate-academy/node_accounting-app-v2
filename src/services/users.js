'use strict';

let users = [];

function init() {
  users = [];
}

function getNewId() {
  if (!users.length) {
    return 1;
  }

  const maxId = users.reduce((prev, user) => (
    Math.max(prev, user.id)
  ), 0);

  return maxId + 1;
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    name,
    id: getNewId(),
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update({ name, id }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  init,
  getAll,
  getById,
  create,
  remove,
  update,
};
