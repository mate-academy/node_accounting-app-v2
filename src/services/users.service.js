'use strict';

let users = [];

const createUser = (name) => {
  const user = {
    name,
    id: Number(new Date()),
  };

  users.push(user);

  return user;
};

const getUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find(user => user.id === id);
};

const removeUser = (id) => {
  users = users.filter(user => user.id !== id);
};

const updateUser = (user, name) => {
  Object.assign(user, { name });

  return user;
};

const clear = () => {
  users.length = 0;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  removeUser,
  updateUser,
  clear,
};
