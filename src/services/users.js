'use strict';

let users = [];

function getAllUsers() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}

function addUser(name) {
  const newId = users.length
    ? Math.max(...users.map(expense => expense.id)) + 1
    : 1;

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteUser(userId) {
  users = users.filter(user => user.id !== userId);
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
};
