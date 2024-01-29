'use strict';

const users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  const user = users.find(el => el.id === userId);

  return user;
};

const createUser = (name) => {
  const userId = users.length ? users[users.length - 1].id : 0;
  const user = {
    id: userId + 1,
    name,
  };

  users.push(user);

  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
