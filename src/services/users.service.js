'use strict';

const { getNextId } = require('../utils/getNextId');

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  const user = users.find(item => item.id === id);

  return user;
};

const createUser = (name) => {
  const newUser = {
    id: getNextId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (id) => {
  users = users.filter(item => item.id !== id);
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

  if (!user) {
    return { errorCode: 404 };
  }

  Object.assign(user, { name });

  return user;
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  clearUsers,
};
