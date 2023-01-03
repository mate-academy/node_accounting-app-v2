'use strict';

let users = [];

function clear() {
  users = [];
}

function getUsers() {
  return users;
}

function createUser(name) {
  const newUsers = {
    id: users.length + 1,
    name,
  };

  users.push(newUsers);

  return newUsers;
}

function getUserById(userId) {
  const foundUser = users.find(good => good.id === Number(userId));

  return foundUser || null;
}

function deleteUser(userId) {
  users = users.filter(user => user.id !== Number(userId));
}

function updateUser(userId, name) {
  const user = getUserById(userId);

  user.name = name;

  return user;
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  clear,
  updateUser,
};
