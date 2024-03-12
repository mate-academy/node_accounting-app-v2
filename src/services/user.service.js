/* eslint-disable no-console */
'use strict';

let users = [];

const getUsers = () => {
  return users;
};

const getById = (id) => {
  return users.find(u => u.id === +id);
};

const createUser = (title) => {
  const user = {
    id: users.length,
    name: title,
  };

  users.push(user);

  return user;
};

const deleteUser = (id) => {
  const user = getById(id);

  const newUser = users.filter(u => u.id !== +id);

  users = newUser;

  return user;
};

const updateUser = (id, title) => {
  const user = getById(id);

  return Object.assign(user, {
    ...user, name: title,
  });
};

const setInitialValue = () => {
  users = [];
};

module.exports = {
  getUsers,
  getById,
  createUser,
  deleteUser,
  updateUser,
  setInitialValue,
};
