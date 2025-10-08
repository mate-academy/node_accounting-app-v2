'use strict';

let users = [];

function getUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function createUser(name) {
  const newUser = { id: users.length + 1, name };

  users.push(newUser);

  return newUser;
}

function deleteUserById(id) {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return null;
  }

  const [user] = users.splice(index, 1);

  return user;
}

function updateUserById({ id, name }) {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
}

const resetUsers = () => {
  users = [];
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  resetUsers,
};
