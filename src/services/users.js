'use strict';

let users = [];

const init = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const addNewUser = (name) => {
  const id = Math.max(0, ...users.map(user => user.id)) + 1;
  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUserById = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const updateUserById = (userId, name) => {
  const foundUser = getUserById(userId);

  Object.assign(foundUser, { name });

  return foundUser;
};

module.exports = {
  init,
  getAllUsers,
  getUserById,
  addNewUser,
  deleteUserById,
  updateUserById,
};
