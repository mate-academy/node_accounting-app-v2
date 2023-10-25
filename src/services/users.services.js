'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const createUser = (name) => {
  const userToAdd = {
    id: Date.now(),
    name,
  };

  users.push(userToAdd);

  return userToAdd;
};

const getUserById = (userId) => {
  const findUser = users.find(user => user.id === +userId);

  return findUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const updateUser = (userId, nameToUpdate) => {
  const findUser = users.find(user => user.id === +userId);

  Object.assign(findUser, { name: nameToUpdate });

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
