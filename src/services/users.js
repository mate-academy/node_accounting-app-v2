'use strict';

let users = [];

const userService = {
  getEmptyUsers() {
    users = [];
  },

  getAll() {
    return users;
  },

  getById(userId) {
    const foundUser = users.find(user => user.id === +userId);

    return foundUser || null;
  },

  create(name) {
    const newUser = {
      id: Math.random(),
      name,
    };

    users.push(newUser);

    return newUser;
  },

  remove(userId) {
    users = users.filter(user => user.id !== +userId);
  },

  update(userId, name) {
    const foundUser = users.find(user => user.id === +userId);

    Object.assign(foundUser, { name });

    return foundUser;
  },

};

module.exports = { userService };
