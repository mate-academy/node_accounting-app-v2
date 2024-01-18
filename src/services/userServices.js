'use strict';

const getNewId = require('../helper.js');

let users = [];

const getAllUsers = () => users;

const getUserById = (userId) => {
  return users.find(user => user.id === userId);
};

const postUser = (name) => {
  const newUserId = getNewId(users);

  const newUser = {
    id: newUserId.toString(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const updateUser = (userId, name) => {
  const user = getUserById(userId);

  Object.assign(user, { name });

  return user;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== userId);
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  postUser,
  updateUser,
};
