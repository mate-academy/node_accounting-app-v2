'use strict';

let users = [];

function setInitialUsers() {
  users = [];
}

function getUsers() {
  return users;
}

function addUser(name) {
  const user = {
    id: users.length + 1,
    name,
  };

  users.push(user);

  return user;
}

function getUserById(userId) {
  const user = users.find(({ id }) => id === Number(userId));

  return user || null;
}

function deleteUser(userId) {
  const userIndex = users.findIndex(({ id }) => id === Number(userId));

  if (userIndex === -1) {
    return false;
  }

  users.splice(userIndex, 1);

  return true;
}

function updateUser(userId, name) {
  const user = getUserById(userId);

  if (!user) {
    return null;
  }

  user.name = name;

  return user;
}

module.exports = {
  setInitialUsers,
  getUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUser,
};
