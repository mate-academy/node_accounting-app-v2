'use strict';

let users = [];

function getUsers() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}

function createNewUser(name) {
  const newUser = {
    id: Math.floor(Math.random() * 1000000),
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  let tempUsers = users;

  tempUsers = users.filter(user => user.id !== userId);

  users = tempUsers;

  return tempUsers;
}

function updateUser(userId, name) {
  const user = getUserById(userId);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getUsers,
  getUserById,
  createNewUser,
  removeUser,
  updateUser,
};
