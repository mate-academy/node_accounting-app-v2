'use strict';

const { getNextId } = require('../helpers/getNextId');

let users = [];

const init = () => {
  users = [];
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
  const newUsers = users.filter(user => user.id !== id);

  if (newUsers.length === users.length) {
    throw new Error('User doesn\'t exist');
  }

  users = newUsers;
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
