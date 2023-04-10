'use strict';

let users = [];

function resetUsers() {
  users = [];
};

function getLastId() {
  if (!users.length) {
    return 1;
  }

  const ids = users.map(user => user.id);

  return Math.max(...ids) + 1;
};

function getAll() {
  return users;
};

function getById(userId) {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
};

function create(name) {
  const newUser = {
    id: getLastId(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== Number(userId));
}

function update(userId, name) {
  const foundUser = getById(userId);

  Object.assign(foundUser, { name });

  return foundUser;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetUsers,
};
