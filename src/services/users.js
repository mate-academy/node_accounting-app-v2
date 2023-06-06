'use strict';

let users = [];

function getAllUsers() {
  return users;
}

function findUserById(userId) {
  return users.find(({ id }) => +userId === id) || null;
}

function createUser(name) {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function updateUser(userId, name) {
  const user = findUserById(userId);

  if (user) {
    Object.assign(user, { name });
  }

  return user;
}

function deleteUser(userId) {
  users = users.filter(({ id }) => +userId !== id);
}

function clearUsers() {
  users = [];
}

module.exports = {
  getAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  clearUsers,
};
