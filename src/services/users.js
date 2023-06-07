'use strict';

let users = [];

function getAll() {
  return users;
}

function findById(userId) {
  return users.find(({ id }) => Number(userId) === id) || null;
}

function create(name) {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function update(userId, name) {
  const user = findById(userId);

  if (user) {
    Object.assign(user, { name });
  }

  return user;
}

function remove(userId) {
  users = users.filter(({ id }) => Number(userId) !== id);
}

function clearUsers() {
  users = [];
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  clearUsers,
};
