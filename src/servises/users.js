'use strict';

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  const findUser = users.find(user => user.id === userId);

  return findUser || null;
}

function create(name) {
  const newUser = {
    id: Math.floor(Math.random() * 10000),
    name,
  };

  users.push(newUser);

  return newUser;
}

function update(userId, name) {
  const user = getById(userId);

  Object.assign(user, { name });

  return user;
}

function remove(userId) {
  users.filter(user => user.id !== userId);
}

function deleteAll() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  deleteAll,
};
