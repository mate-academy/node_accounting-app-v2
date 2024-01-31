'use strict';

let users = [];

const getUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find(item => item.id === id);
};

const createUser = (user) => {
  const newUser = {
    ...user,
    id: new Date().valueOf(),
  };

  users.push(newUser);

  return newUser;
};

const updateUserById = (id, user) => {
  const userToUpdate = getUserById(id);

  if (!userToUpdate) {
    return;
  }

  Object.assign(userToUpdate, user);

  return userToUpdate;
};

const deleteUserById = (id) => {
  const userToDelete = getUserById(id);

  if (!userToDelete) {
    return;
  }

  users = users.filter(item => item.id !== id);

  return userToDelete;
};

const cleanUsers = () => {
  users = [];
};

module.exports = {
  getUsers,
  cleanUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
};
