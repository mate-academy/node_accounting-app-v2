'use strict';

let users = [];

const getAllUsers = () => users;

const getUserById = (id) => {
  return users.find(user => +id === user.id) || null;
};

const addUser = (name) => {
  const user = {
    id: +new Date(),
    name,
  };

  users.push(user);

  return user;
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  if (!user) {
    return;
  }

  Object.assign(user, { name });

  return user;
};

const deleteUser = (id) => {
  users = users.filter(user => user.id !== +id);
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  clearUsers,
};
