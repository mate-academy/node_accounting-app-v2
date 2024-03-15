'use strict';

const getMaxId = require('../getMaxId.js');

const users = [];

const initUsers = () => {
  users.length = 0;
};

const getUsers = () => users;

const getUserById = id => users.find(user => user.id === +id);

const updateUser = (id, name) => {
  const userToUpdate = getUserById(id);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

const addNewUser = name => {
  const newUser = {
    'id': getMaxId(users) + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = id => {
  const index = users.findIndex(user => user.id === +id);

  users.splice(index, 1);
};

module.exports = {
  getUserById,
  getUsers,
  deleteUser,
  addNewUser,
  updateUser,
  initUsers,
};
