'use strict';

const { getNewId } = require('../helpers/getNewId');

let users = [];

const resetUsers = () => {
  users = [];

  return users;
};

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
};

const createUser = (name) => {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== Number(userId));
};

const updateUser = ({
  userId,
  name,
}) => {
  const updatedUser = getUserById(userId);

  Object.assign(updatedUser, { name });

  return updatedUser;
};

module.exports = {
  resetUsers,
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
