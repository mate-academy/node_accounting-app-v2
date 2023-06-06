'use strict';

const users = [];

function getUsers() {
  return users;
}

function getUserById(userId) {
  return users.find(user => user.id === +userId);
}

function createUser(name) {
  const newUser = {
    id: Math.random(),
    name,
  };

  users.push(newUser);

  return newUser;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
