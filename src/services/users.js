'use strict';

const generateNewId = require('../utiles/generateNewId');

let users = [];

const setInitialUsers = (initialUsers) => {
  users = initialUsers;

  return users;
};

const getAll = () => {
  return users;
};

const getUserById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const createNewUser = (name) => {
  const newUser = {
    id: generateNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const updateUser = ({ id, name }) => {
  let userToUpdate = getUserById(id);

  userToUpdate = {
    ...userToUpdate,
    name,
  };

  return userToUpdate;
};

module.exports = {
  setInitialUsers,
  getAll,
  getUserById,
  createNewUser,
  deleteUser,
  updateUser,
};
