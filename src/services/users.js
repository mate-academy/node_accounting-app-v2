'use strict';

let users = [];
let idCounter = 0;

function setInitialValue() {
  users = [];
  idCounter = 0;
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId) || null;

  return foundUser;
}

function create(name) {
  const preparedUser = {
    id: idCounter,
    name,
  };

  idCounter++;
  users.push(preparedUser);

  return preparedUser;
}

function remove(userId) {
  const filtredUsers = users.filter(user => user.id !== +userId);

  users = filtredUsers;
}

function update(userId, name) {
  const userToUpdate = getById(userId);

  Object.assign(userToUpdate, { name });
}

module.exports = {
  setInitialValue,
  getAll,
  getById,
  create,
  remove,
  update,
};
