'use strict';

let users = [];

const usersService = {
  setInitial: () => {
    users = [];
  },
  getAll: () => users,
  getById: (userId) => {
    const findUserById = users.find(user => user.id === Number(userId));

    return findUserById || null;
  },
  create: (name) => {
    const newId = Math.max(...users.map(u => u.id), 0) + 1;

    const newUser = {
      id: newId,
      name,
    };

    users.push(newUser);

    return newUser;
  },
  remove: (userId) => {
    users = users.filter(user => user.id !== Number(userId));
  },
  update: (userId, name) => {
    const foundUser = users.find(user => user.id === Number(userId)) || null;

    Object.assign(foundUser, { name });

    return foundUser;
  },
};

module.exports = {
  usersService,
};
