'use strict';

const { getNewId } = require('./services');

let users = [];

const getAllUsers = () => users;

const getUser = id => users.find(user => user.id === +id);

const addUser = (name) => {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (id) => {
  const newUsers = users.filter(user => user.id !== +id);

  if (users.length === newUsers.length) {
    return;
  }

  users = newUsers;

  return users;
};

const updateUser = (id, name) => {
  const foundUser = users.find(user => user.id === +id);

  if (!foundUser) {
    return;
  }

  const updatedUser = {
    id: +id,
    name,
  };

  users = users.map(user => {
    return user.id === +id
      ? updatedUser
      : user;
  });

  return updatedUser;
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  removeUser,
  updateUser,
  clearUsers,
};
