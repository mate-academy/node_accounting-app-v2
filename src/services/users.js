'use strict';

let users = [];
let idsUserCounter = 0;

function setDefaultUsers() {
  users = [];
  idsUserCounter = 0;
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find((user) => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  idsUserCounter++;

  const newUser = {
    id: idsUserCounter,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter((user) => user.id !== +userId);
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  setDefaultUsers,
  getAll,
  getById,
  create,
  remove,
  update,
};
