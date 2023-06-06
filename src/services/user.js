'use strict';

let users = [];

const resetUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const addUser = (name) => {
  const maxId = Math.max(...users.map(user => user.id), 0);
  const newId = maxId + 1;

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return;
  }

  users.splice(userIndex, 1);
};

const updateUser = (userId, name) => {
  const foundUser = getById(userId);

  if (!foundUser) {
    return null;
  }

  foundUser.name = name;

  return foundUser;
};

module.exports = {
  resetUsers,
  getAll,
  getById,
  addUser,
  removeUser,
  updateUser,
};
