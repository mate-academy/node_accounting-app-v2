'use strict';

const { createNumberId } = require('../helpers/createNumberId');

class UsersService {
  constructor() {
    this.__users = [];
  };

  getUsers() {
    return this.__users;
  };

  createUser(name) {
    const newUser = {
      id: createNumberId(this.__getUsersIds()),
      name,
    };

    this.__users.push(newUser);

    return newUser;
  };

  getUserById(id) {
    // eslint-disable-next-line no-console
    console.log('----users.find=', this.__users.find(user => user.id === id));

    return this.__users.find(user => user.id === id) || null;
  };

  removeUserById(id) {
    this.__users = this.__users.filter(user => user.id !== id);
  };

  updateUserById(id, params) {
    const foundUser = this.getUserById(id);
    const updateUser = {
      ...foundUser, ...params, id,
    };

    this.removeUserById(id);

    this.__users.push(updateUser);

    return updateUser;
  };

  __clear() {
    this.__users = [];
  };

  __getUsersIds() {
    return this.__users.map(user => user.id);
  };
}

// let users = [];

// a private method
// const getUsersIds = () => {
//   return users.map(user => user.id);
// };

// const usersService = {
// getUsers() {
//   // eslint-disable-next-line no-console
//   console.log('----------- users=', users);

//   return users;
// },

// createUser(name) {
//   const newUser = {
//     id: createNumberId(getUsersIds()),
//     name,
//   };

//   users.push(newUser);

//   return newUser;
// },

// getUserById(id) {
//   // eslint-disable-next-line no-console
//   console.log('----------- users.find=', users.find(user => user.id === id));

//   return users.find(user => user.id === id) || null;
// },

// removeUserById(id) {
//   users = users.filter(user => user.id !== id);
// },

// updateUserById(id, params) {
//   const foundUser = this.getUserById(id);
//   const updateUser = {
//     ...foundUser, ...params, id,
//   };

//   this.removeUserById(id);

//   users.push(updateUser);

//   return updateUser;
// },
// };

const usersService = new UsersService();

module.exports = {
  usersService,
};
