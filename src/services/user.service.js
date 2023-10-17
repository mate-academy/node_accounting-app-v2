'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const createUser = (name) => {
  const id = +(new Date());
  const user = {
    id,
    name,
  };

  users.push(user);

  return user;
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

const removeUser = (id) => {
  users = users.filter(user => user.id !== +id);
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  clearUsers,
};
