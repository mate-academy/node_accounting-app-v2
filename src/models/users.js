'use strict';

class Users {
  constructor() {
    this.users = [];
  }

  reset() {
    this.users = [];
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(userId) {
    return this.users.find((user) => user.id === userId);
  }

  createUser(userName) {
    const newUser = {
      id: this.users.length + 1,
      name: userName,
    };

    this.users.push(newUser);

    return newUser;
  }

  changeUserById(userId, userName) {
    const user = this.getUserById(userId);

    user.name = userName;

    return user;
  }

  deleteUserById(userId) {
    this.users = this.users.filter((currUser) => currUser.id !== userId);
  }
}

const usersModel = new Users();

module.exports = usersModel;
