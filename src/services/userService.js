'use strict';

let users = [];

const getUsers = () => users || [];

const createUser = (name) => {
  const newUser = {
    id: Date.now(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const getUserById = (userId) => {
  return users.find(({ id }) => id === userId);
};

const updateUser = (user, propertiesToUpdate) => {
  Object.assign(user, propertiesToUpdate);

  return user;
};

const deleteUser = (userId) => {
  users = users.filter(({ id }) => id !== userId);
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  clearUsers,
};
