'use strict';

let nextUserId = 1;

let users = [];

function cleanUsersArray() {
  users = [];
};

function takeUsers() {
  return users;
};

function getUserById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function createUser(name) {
  const newUser = {
    id: nextUserId++,
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  users = users.filter(user => user.id !== +userId);
}

function updateUser(userId, name) {
  const foundUser = getUserById(userId, users);

  Object.assign(foundUser, { name });

  return foundUser;
}

module.exports = {
  cleanUsersArray,
  takeUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
