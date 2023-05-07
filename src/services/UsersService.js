'use strict';

const { v4: uuid } = require('uuid');

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  return users.find(({ id }) => id === userId) || null;
}

function create(name) {
  const newUser = {
    id: uuid(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(({ id }) => id !== userId);
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

function removeMany(ids) {
  if (!ids.every(getById)) {
    throw new Error('There is a missing user to delete');
  };

  users = users.filter(({ id }) => !ids.includes(id));
}

function updateMany(records) {
  for (const { id, name } of records) {
    const foundUser = users.find(user => user.id === id);

    if (!foundUser) {
      continue;
    }

    update({
      id,
      name,
    });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeMany,
  updateMany,
};
