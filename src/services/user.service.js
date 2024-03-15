'use strict';

let users = [];
let increment = 1;

function clearAllUsers() {
  users = [];
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
  users = newUsers;
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
