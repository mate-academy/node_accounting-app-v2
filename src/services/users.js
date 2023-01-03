'use strict';

let users = [];

function getAll() {
  return users;
}

function getOne(userId) {
  return users.find(user => user.id === userId);
}

function addOne(name) {
  const newUserId = users.length
    ? users.reduce((max, user) => Math.max(max, user.id), 0) + 1
    : 1;

  const newUser = {
    id: newUserId,
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteOne(userId) {
  const filteredUsers = users.filter(user => user.id !== userId);

  if (filteredUsers.length === users.length) {
    return false;
  }

  users = filteredUsers;

  return true;
}

function updateOne(userId, name) {
  const foundUser = getOne(userId);

  return Object.assign(foundUser, { name });
}

function reset() {
  users = [];
}

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  reset,
};
