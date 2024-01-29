'use strict';

const { maxId } = require('../helpers/helper');

let users = [];

const getUsers = () => {
  return users;
};

const deleteUser = (id) => {
  users = users.filter(user => user.id !== id);
};

const getById = id => {
  return users.find(user => user.id === id);
};

const createUser = (name) => {
  const newUser = {
    id: maxId(users),
    name,
  };

  users.push(newUser);
};

const updateUser = (id, newName) => {
  const updatedUsers = users.map(user => {
    if (user.id === id) {
      return {
        ...user, name: newName,
      };
    }

    return user;
  });

  users = updatedUsers;
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getUsers,
  deleteUser,
  createUser,
  getById,
  updateUser,
  clearUsers,
};
