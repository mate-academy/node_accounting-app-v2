'use strict';

let users = [];

function clearUsers() {
  users = [];
}

function getAll() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}

function createUser(name) {
  const newUser = {
    id: users.length,
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteUser(userId) {
  users = users.filter(user => user.id !== userId);
}

function userUpdate({ id, name }) {
  const user = getUserById(id);

  Object.assign(user, { name });
}

module.exports = {
  clearUsers,
  getAll,
  getUserById,
  createUser,
  deleteUser,
  userUpdate,
};
