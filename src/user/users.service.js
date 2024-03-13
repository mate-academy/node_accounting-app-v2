'use strict';

const users = [];

const init = () => {
  users.length = 0;
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find(user => user.id === +id);
};

const findUserToDelete = (userToDelete) => {
  return users.indexOf(userToDelete);
};

const deleteUser = (indexDeleteUser) => {
  users.splice(indexDeleteUser, 1);
};

const addUser = (user) => {
  users.push(user);
};

module.exports = {
  init,
  getAllUsers,
  getUserById,
  findUserToDelete,
  deleteUser,
  addUser,
};
