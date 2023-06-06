'use strict';

let users = [];

function getAllUsers() {
  return users;
}

function findUserById(userId) {
  const foundUser = users.find(({ id }) => id === userId);

  return foundUser || null;
}

function createUser(name) {
  const newUserId = users.length + 1;

  const newUser = {
    id: newUserId,
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId) {
  users = users.filter(({ id }) => id !== userId);

  return users;
}

function updateUser({ id, name }) {
  const user = findUserById(+id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getAllUsers,
  findUserById,
  createUser,
  removeUser,
  updateUser,
};
