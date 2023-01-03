'use strict';

let users = [];

function init() {
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
  const newUser = {
    name,
    id: users.length + 1,
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
