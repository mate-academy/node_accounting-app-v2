'use strict';

let users = [];

function resetUsers() {
  users = [];
}

function getUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === Number(id));
}

function createUser(name) {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteUser(id) {
  users = users.filter(user => user.id !== Number(id));

  return users;
}

function updateUser(id, name) {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  resetUsers,
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
