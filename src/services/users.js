'use strict';

let users = [];

function resetUsers() {
  users = [];
};

function getLastId() {
  if (users.length === 0) {
    return 1;
  }

  const ids = users.map(user => user.id);

  return Math.max(...ids) + 1;
}

function getAll() {
  return users;
}

function getById(userId) {
  return users.find(user => user.id === +userId) || null;
}

function create(name) {
  const createdUser = {
    name,
    id: getLastId(),
  };

  users.push(createdUser);

  return createdUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update(userId, name) {
  const userForUpdate = getById(userId);

  Object.assign(userForUpdate, { name });

  return userForUpdate;
}

module.exports = {
  resetUsers,
  getAll,
  getById,
  create,
  remove,
  update,
};
