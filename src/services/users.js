'use strict';

let users = [];

let userIds = 0;

function serverReload() {
  users = [];
  userIds = 0;
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  userIds++;

  const newUser = {
    id: userIds,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== userId);
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, {
    id, name,
  });

  return user;
}

module.exports = {
  serverReload,
  getAll,
  getById,
  create,
  remove,
  update,
};
