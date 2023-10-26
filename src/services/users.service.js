'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const createUser = (name) => {
  const createdUser = {
    id: Date.now(),
    name,
  };

  users.push(createdUser);

  return createdUser;
};

const getUserById = (userId) => {
  const findUser = users.find(user => user.id === +userId);

  return findUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const updateUser = (id, updatedName) => {
  const updatedUser = getUserById(id);

  Object.assign(updatedUser, { name: updatedName });

  return updatedUser;
};

const resetUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
  resetUsers,
};
