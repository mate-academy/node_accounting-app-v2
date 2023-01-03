'use strict';

let users = [];

function getAll() {
  return users;
}

function findUserById(userId) {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
}

function addUser(name) {
  const maxID = users.length
    ? Math.max(...users.map(user => user.id))
    : 0;

  const newUser = {
    id: maxID + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function patchUser(foundUser, name) {
  foundUser.name = name;

  return foundUser;
}

function deleteUserById(userId) {
  users = users.filter(user => user.id !== Number(userId));
}

module.exports = {
  getAll,
  findUserById,
  addUser,
  deleteUserById,
  patchUser,
};
