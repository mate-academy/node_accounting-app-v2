'use strict';

const USERS = [];

module.exports = {
  getAll: () => USERS,

  createUser: (name) => USERS.push({
    id: USERS.length === 0 ? 1 : USERS[USERS.length - 1].id + 1,
    name,
  }) && [...USERS].pop(),

  getUserById: (userId) => USERS.find(user => user.id === +userId),

  removeUser: (userId) => USERS
    .splice(USERS.findIndex(user => user.id === +userId), 1),

  updateUser: (userId, name) => Object
    .assign(module.exports.getUserById(userId), { name }),

  resetUser: () => USERS.splice(0),
};
