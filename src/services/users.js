'use strict';

let users = [];

const reset = () => {
  users = [];
};

const getAllUsers = () => users;

const getUserById = (userId) => {
  const foundUser = users.find((user) => user.id === +userId);

  return foundUser || null;
};

const createUser = (name) => {
  const newUser = {
    id: Math.random(users.length + 1),
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter((user) => user.id !== +userId);

  return users;
};

const updateUser = ({ id, name }) => {
  const foundUser = getUserById(id);

  foundUser.name = name;

  return foundUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  reset,
};
