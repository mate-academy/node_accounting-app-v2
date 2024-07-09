/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
'use strict';

const users = [];

const userService = {
  createUser(name, email) {
    const newUser = { id: users.length + 1, name, email };

    users.push(newUser);

    return newUser;
  },

  getAllUsers(filters = {}) {
    const filteringTests = {
      id: (id, user) => Number(id) === user.id,
      name: (name, user) => name === user.name,
      email: (email, user) => email === user.email,
      default: () => true,
    };

    return users.filter((user) =>
      Object.entries(filters).every(([key, value]) => {
        const test = filteringTests[key] ?? filteringTests.default;

        return test(value, user);
      }));
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

module.exports = userService;
