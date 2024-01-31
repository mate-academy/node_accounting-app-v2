'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const getUsersById = (id) => {
  return users.find(user => user.id === Number(id)) || null;
};

const createUser = (name) => {
  const user = {
    id: Math.floor(Math.random() * 10000),
    name,
  };

  users.push(user);

  return user;
};

const removeUser = (id) => {
  users = users.filter(user => user.id !== Number(id));
};

const updateUser = ({ id, name }) => {
  const user = getUsersById(Number(id));

  if (!user) {
    return null;
  }

  Object.assign(user, { name });

  return user;
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUsersById,
  createUser,
  removeUser,
  updateUser,
  clearUsers,
};
