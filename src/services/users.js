'use strict';

let users = [];

function setInitialUsers() {
  users = [];
}

function getAll() {
  return users;
};

function addUser(name) {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

function removeUser(userId) {
  users = users.filter(user => user.id !== +userId);
};

function updateUser(userId, name) {
  const foundUser = getById(userId);

  const updatedUser = Object.assign(foundUser, { name });

  return updatedUser;
}

module.exports = {
  setInitialUsers,
  getAll,
  addUser,
  getById,
  removeUser,
  updateUser,
};
