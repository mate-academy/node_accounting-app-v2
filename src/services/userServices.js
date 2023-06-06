'use strict';

let users = [];

function resetUsers() {
  users = [];
}

function getAllUsers() {
  return users;
}

function getByUserId(userId) {
  return users.find(user => user.id === Number(userId));
}

function createUser(name) {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteUser(userId) {
  users = users
    .filter(user => user.id !== Number(userId));
}

function updateUser(userId, name) {
  const user = getByUserId(userId);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getAllUsers,
  getByUserId,
  createUser,
  deleteUser,
  updateUser,
  resetUsers,
};
