'use strict';

let users = [];

const userService = {
  getAll: () => users,
  getById: (id) => users.find(user => +user.id === +id) || null,
  addUser: (newUser) => {
    const userWithId = {
      ...newUser,
      id: Math.random(),
    };

    users.push(userWithId);

    return userWithId;
  },
  removeUser: (id) => {
    users = users.filter(user => +user.id !== +id);
  },
  updateUser: (newUserData, id) => {
    let updatedUser;

    const updatedUsers = users.map(user => {
      if (+user.id === +id) {
        updatedUser = {
          ...user,
          ...newUserData,
        };

        return updatedUser;
      }

      return user;
    });

    users = updatedUsers;

    return updatedUser;
  },
};

module.exports = {
  userService, users,
};
