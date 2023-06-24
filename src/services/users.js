'use strict';

let users = [];
let nextUserId = 1;

function init() {
  users = [];
}

const findById = (itemsArray, id) => {
  return itemsArray.find(item => item.id === +id);
};

const filterById = (itemsArray, value) => {
  return itemsArray.filter(item => item.id !== +value);
};

function getAll() {
  return users;
};

function getUserById(userId) {
  const foundUser = findById(users, userId);

  return foundUser || null;
};

function createUser(name) {
  const newUser = {
    id: nextUserId++,
    name,
  };

  users.push(newUser);

  return newUser;
};

function removeUser(userId) {
  users = filterById(users, userId);
};

function updateUser({ userId, name }) {
  const user = getUserById(userId);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getAll,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  init,
};
