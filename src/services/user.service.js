'use strict';

const users = [];
let increment = 1;

function clearAllUsers() {
  users.length = 0;
};

function getAllUsers() {
  return users;
};

function getUserById(id) {
  return users.find(user => user.id === id);
};

function createNewUser(name) {
  const user = {
    name,
    id: increment,
  };

  users.push(user);
  increment++;

  return user;
}

function deleteUserById(id) {
  return users.filter(user => user.id !== id);
}

function setAllUsers(newUsers) {
  users.length = 0;
  users.push(...newUsers);
}

function updateUser(user, name) {
  return Object.assign(user, { name });
}

module.exports = {
  updateUser,
  setAllUsers,
  deleteUserById,
  createNewUser,
  getAllUsers,
  getUserById,
  clearAllUsers,
};
