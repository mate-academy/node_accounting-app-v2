'use strict';

let users = [];
let usersCounter = 0;

const getAllUsers = () => users;

const getUserById = (id) => users.find(user => +user.id === +id);

const createUser = (name) => {
  const newUser = {
    id: ++usersCounter,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (id) => {
  users = users.filter(user => user.id !== +id);

  return users;
};

const updateUser = (id, name) => {
  let newUser = {};

  users = users.map(user => {
    if (user.id === +id) {
      newUser = {
        ...user,
        name: name,
      };

      return newUser;
    }

    return user;
  });

  return newUser;
};

const resetUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  resetUsers,
};
