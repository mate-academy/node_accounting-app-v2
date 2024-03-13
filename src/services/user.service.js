'use strict';

let users = [];

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
    id: users.length,
  };

  users.push(user);

  return user;
}

function deleteUserById(id) {
  return users.filter(user => user.id !== id);
}

function setAllUsers(newUsers) {
  users.length = 0;
  users = [...newUsers];
}

function updateUser(user, name) {
  Object.assign(user, { name });
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
