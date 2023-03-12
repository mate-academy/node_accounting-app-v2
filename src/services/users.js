'use strict';

const generateId = require('../utils/generateId');

const users = [
  {
    'id': 1,
    'name': 'Mango',
  },
  {
    'id': 2,
    'name': 'Poly',
  },
  {
    'id': 3,
    'name': 'Dolly',
  },
];

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: generateId.genId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  const userIndexToDelete = users.findIndex(
    user => user.id === +userId,
  );

  users.splice(userIndexToDelete, 1);
}

function update(userId, name) {
  const userToUpdate = getById(userId);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
