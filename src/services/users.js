'use strict';

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: users.length + 1,
    name: name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== Number(userId));
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

function reset() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
