/* eslint-disable no-shadow */
'use strict';

const users = [];
let currentId = 1;

const userModel = {
  createUser(name, email) {
    const newUser = { id: currentId++, name, email };

    users.push(newUser);

    return newUser;
  },

  getAllUsers() {
    return users;
  },

  getUserById(id) {
    return users.find((user) => user.id === id);
  },

  updateUser(id, name, email) {
    const user = users.find((user) => user.id === id);

    if (user) {
      user.name = name;
      user.email = email;

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
};

module.exports = { userModel };
