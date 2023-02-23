'use strict';

const { generateId } = require('../helpers/generateId');

let users = [];

const clearUsers = () => {
  users = [];
};

function getAll() {
  return users;
}

function findById(userId) {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: generateId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  const initialLength = users.length;

  users = users.filter(user => user.id !== Number(userId));

  const finalLength = users.length;

  return finalLength < initialLength;
}

function update({ userId, fieldsToUpdate }) {
  const user = findById(userId);

  Object.assign(user, { ...fieldsToUpdate });

  return user;
}

module.exports = {
  getAll,
  findById,
  create,
  remove,
  update,
  clearUsers,
};
