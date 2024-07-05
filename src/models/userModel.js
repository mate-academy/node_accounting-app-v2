/* eslint-disable no-shadow */
'use strict';

const users = [];

const userModel = {
  createUser(name, email) {
    const newUser = { id: users.length + 1, name, email };

    users.push(newUser);

    return newUser;
  },

  getAllUsers() {
    return users;
  },

  getUserById(id) {
    return users.find((user) => user.id === id);
  },

  updateUser(id, name) {
    const user = users.find((user) => user.id === id);

    if (user) {
      user.name = name;

      return user;
    }

    return null;
  },

  deleteUser(id) {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users.splice(index, 1);

      return true;
    }

    return false;
  },

  resetUsers() {
    users.length = 0;
  },
};

module.exports = userModel;
