'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getUserById = (userId) => {
  const userById = users.find((user) => user.id === userId);

  return userById || null;
};

const createUser = (name) => {
  const newUser = {
    id: `${users.length + 1}`,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter((user) => user.id !== userId);
};

// const editUser = () => {};

module.exports = {
  getAll,
  getUserById,
  createUser,
  deleteUser,
  //   editUser,
};
