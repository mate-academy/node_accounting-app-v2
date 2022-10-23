'use strict';

let newUserId = 1;
let users = [];

const userServices = {
  getAll: () => users,
  getOne: (userId) => users.find(user => user.id === +userId),
  create: (name) => {
    const newUser = {
      id: newUserId++,
      name,
    };

    users.push(newUser);

    return newUser;
  },
  remove: (id) => {
    const filteredUsers = users.filter(user => user.id !== +id);

    if (filteredUsers.length === users.length) {
      return null;
    }

    users = filteredUsers;

    return filteredUsers;
  },
  reset: () => {
    users = [];
  },
};

module.exports = {
  userServices,
};
