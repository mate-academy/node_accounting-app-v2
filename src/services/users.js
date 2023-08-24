'use strict';

let users = [];

function getUsers() {
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

function getUserById(userId) {
  return users.find(user => user.id === userId);
};

function deleteUser(userId) {
  const filteredUsers = users.filter(user => user.id !== userId);

  users = filteredUsers;

  return users;
};

function updateUser({ userId, name }) {
  const updatedUser = getUserById(+userId);

  Object.assign(updatedUser, { name });

  return updatedUser;
};

function removeAllUsers() {
  users.length = 0;
};

module.exports = {
  getUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUser,
  removeAllUsers,
};
