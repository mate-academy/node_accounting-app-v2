'use strict';

const users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  const user = users.find(userItem => userItem.id === +id);

  return user;
};

const createUser = (name) => {
  const id = users.length + 1;
  const user = {
    id,
    name,
  };

  users.push(user);

  return user;
};

const updateUser = (id, newName) => {
  const user = getUserById(id);

  user.name = newName;

  return user;
};

const removeUser = (id) => {
  const filteredUsers = users.filter(user => user.id !== +id);

  users.length = 0;
  users.push(...filteredUsers);
};

const refreshUsers = () => {
  users.length = 0;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  refreshUsers,
};
