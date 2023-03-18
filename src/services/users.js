'use strict';

let users = [];
let largestId = 0;

function setInitialValue() {
  users = [];
  largestId = 0;
};

function getAll() {
  return users;
};

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

function create(name) {
  largestId++;

  const newUser = {
    id: largestId,
    name,
  };

  users.push(newUser);

  return newUser;
};

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
};

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  setInitialValue,
};
