'use strict';

const { createId } = require('../utils/createId');

let users = [];

const getInitial = () => {
  users = [];
};

const getUsers = () => users;

const getUser = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const createUser = (name) => {
  const newUser = {
    id: createId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const updateUser = ({ id, name }) => {
  const foundUser = getUser(id);

  foundUser.name = name;

  return foundUser;
};

module.exports = {
  userService: {
    getInitial,
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
  },
};
