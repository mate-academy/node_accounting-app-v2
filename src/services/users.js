'use strict';

let users = [];
let newUserId = 1;

function init() {
  users = [];
};

function getAllUsers() {
  return users;
};

function getByUserId(userId) {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
}

function createNewUser(name) {
  const newUser = {
    id: newUserId++,
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  users = users.filter(user => user.id !== Number(userId));
};

function updateUser({ id, name }) {
  const user = getByUserId(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAllUsers,
  getByUserId,
  createNewUser,
  removeUser,
  updateUser,
  init,
};
