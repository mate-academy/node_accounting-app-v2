'use strict';

let users = [];

function getAllUsers() {
  return users;
}

function getUserById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function addOne(name) {
  const ids = users.map(user => user.id);

  const maxId = Math.max(...ids, 0) + 1;

  const newUser = {
    id: maxId,
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  users = users.filter(user => user.id !== +userId);
}

function updateUser(userId, newUserName) {
  const foundUser = getUserById(userId);

  Object.assign(foundUser, { name: newUserName });

  return foundUser;
}

function clearUser() {
  users = [];
}

module.exports = {
  getAllUsers,
  addOne,
  getUserById,
  removeUser,
  updateUser,
  clearUser,
};
