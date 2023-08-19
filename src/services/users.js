'use strict';

let users = [];

const getAllUsers = () => users;

const getUserById = (userId) => users
  .find(({ id }) => id === userId) || null;

const createUser = userName => {
  const newUser = {
    name: userName,
    id: users.length + 1,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(({ id }) => id !== userId);
};

const updateUser = (userId, name) => {
  const userToUpdate = getUserById(userId);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

const reset = () => {
  users.length = 0;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  reset,
};
