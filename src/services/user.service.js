'use strict';

let users = [];

const getAll = () => {
  return users;
};

const resetUsers = () => {
  users = [];
};

const getUserById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const createUser = (name) => {
  const user = {
    id: users.length,
    name,
  };

  users.push(user);

  return user;
};

const updateUser = (user, name) => {
  return Object.assign(user, { name });
};

const deleteUser = (id) => {
  users = users.filter(user => user.id !== +id);
};

module.exports = {
  getAll,
  resetUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
