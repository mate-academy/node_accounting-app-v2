'use strict';

let users = [];

const getUsers = () => users;

const getUserById = (id) => {
  const normalizedId = parseInt(id);

  return users.find(user => user.id === normalizedId) || null;
};

const createUser = (name) => {
  const newUser = {
    id: (users.length + 1) || 0,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (id) => {
  const normalizedId = parseInt(id);

  const deletedUser = users.find(user => user.id === normalizedId) || null;

  users = users.filter(user => user.id !== normalizedId) || [];

  return deletedUser;
};

const updateUser = (name, id) => {
  const normalizedId = parseInt(id);

  const oldUserIndex = users.findIndex(user => user.id === normalizedId);

  const oldUser = users[oldUserIndex];

  const updatedUser = {
    id: normalizedId,
    name,
  };

  users[oldUserIndex] = Object.assign(oldUser, updatedUser);

  return {
    oldUser,
    updatedUser,
  };
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
