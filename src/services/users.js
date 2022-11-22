'use strict';

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const maxId = users.length ? Math.max(...users.map(user => user.id)) : 0;
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

function update(user, name) {
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
