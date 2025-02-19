'use strict';

const { getNextId } = require('../helpers/getNextId');

const users = [];

const init = () => {
  users.length = 0;
};

const getUsers = () => users;

const getUserById = (id) => {
  const searchUser = users.find(user => user.id === id);

  if (!searchUser) {
    throw new Error('User doesn\'t exist');
  }

  return searchUser;
};

const createUser = (name) => {
  const user = {
    name,
    id: getNextId(users),
  };

  users.push(user);

  return user;
};

const deleteUser = (id) => {
  const userToDeleteId = users.findIndex(user => user.id === id);

  if (userToDeleteId === -1) {
    throw new Error('User doesn\'t exist');
  }

  users.splice(userToDeleteId, 1);
};

const changeUser = (name, id) => {
  const userToChange = users.find(user => user.id === id);

  if (!userToChange) {
    throw new Error('User doesn\'t exist');
  }

  userToChange.name = name;

  return userToChange;
};

module.exports = {
  changeUser,
  deleteUser,
  getUsers,
  getUserById,
  createUser,
  init,
};
