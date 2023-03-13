'use strict';

const { getNewId } = require('../utils/getNewId');

let users = [];

const getInitialValue = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const createUser = (name) => {
  const id = getNewId(users);

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  userService: {
    getInitialValue,
    getAllUsers,
    getUserById,
    createUser,
    removeUser,
    updateUser,
  },
};
