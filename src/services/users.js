'use strict';

let users = [];

const getAllUsers = () => users;

const createUserId = () => {
  return Math.max(...users.map(user => +user.id), 0) + 1;
};

const getUserById = (userId) => {
  return users.find(user => +user.id === +userId) || null;
};

const createUser = (name) => {
  const newUser = {
    id: createUserId(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => +user.id !== +userId);
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

const resetUsers = () => {
  users.length = 0;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  resetUsers,
};
