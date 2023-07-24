'use strict';

let users = [];

const userService = {
  getAll: async() => {
    return users;
  },

  getById: async(userId) => {
    return users.find(user => user.id === userId);
  },

  create: async(name) => {
    const newUser = {
      id: 0,
      name,
    };

    await users.push(newUser);

    return newUser;
  },

  remove: async(userId) => {
    users = users.filter(user => user.id !== userId);
  },

  update: async({ id, name }) => {
    const user = await userService.getById(id);

    Object.assign(user, { name });

    return user;
  },
};

module.exports = { userService };
