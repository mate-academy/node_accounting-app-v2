'use strict';

let users = [];
let currentId = 0;

const getAllUsers = () => {
  return users;
};

const createUser = (name) => {
  currentId++;

  const newUser = {
    id: currentId,
    name,
  };

  users.push(newUser);

  return newUser;
};

const getUserById = (userId) => {
  const findUser = users.find(user => user.id === +userId);

  return findUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const updateUser = (userId, newName) => {
  const findUser = users.find(user => user.id === +userId);

  Object.assign(findUser, { name: newName });

  return findUser;
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
