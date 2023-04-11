'use strict';

let users = [];

function getInitialValue() {
  users = [];

  return users;
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const maxId = Math.max(users.map(user => user.id), 0);

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getInitialValue,
  getAll,
  getById,
  create,
  remove,
  update,
};
