'use strict';

const users = [];
let currentUserId = 1;

function getAllUsers() {
  return users;
}

function createUser(name) {
  const newUser = {
    id: currentUserId++,
    name,
  };

  users.push(newUser);

  return newUser;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function deleteOne(id) {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  const [removedUser] = users.splice(userIndex, 1);

  return removedUser;
}

function update(id, name) {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
}

function clearUsers() {
  users.length = 0;
  currentUserId = 1;
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteOne,
  update,
  clearUsers,
};
