'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  const user = users.find((u) => u.id === +id);

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
  users = users.filter((u) => u.id !== +id);
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
