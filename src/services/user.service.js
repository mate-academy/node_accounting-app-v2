'use strict';

const createNewId = require('./../helpers/createNewId');

let users = [];

const userService = {
  getAll: () => users,
  getById: (id) => users.find((user) => user.id === id) || null,
  delete: (id) => (users = users.filter((user) => user.id !== id)),

  create: (name) => {
    const newUser = {
      name,
      id: createNewId(users),
    };

    users.push(newUser);

    return newUser;
  },

  update: (id, fields) => {
    const user = userService.getById(id) || null;

    Object.assign(user, fields);

    return user;
  },

  clear: () => {
    users = [];
  },
};

module.exports = userService;
