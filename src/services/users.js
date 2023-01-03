'use strict';

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
}

function create(name) {
  const maxId = Math.max(0, ...users.map(user => user.id));
  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== Number(userId));
}

function update(user, name) {
  Object.assign(user, { name });

  return user;
}

function clearUsersData() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  clearUsersData,
};
