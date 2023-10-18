'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find(user => user.id === +id);
};

const createUser = (name) => {
  const user = {
    id: +new Date(),
    name,
  };

  users.push(user);

  return user;
};

const updateUser = (id, name) => {
  const update = getUserById(id);

  Object.assign(update, { name });

  return update;
};

const removeUser = (id) => {
  users = users.filter(user => user.id !== +id);
};

const clear = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  clear,
};
