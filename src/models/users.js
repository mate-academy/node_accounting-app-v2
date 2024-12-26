'use strict';

class Users {
  constructor() {
    this.users = [];
  }

  reset() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  getUser(id) {
    return this.users.find((user) => user.id === id);
  }

  addUser({ name }) {
    const newUser = {
      id: this.users.length + 1,
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  removeUser(id) {
    const user = this.getUser(id);

    if (!user) {
      return null;
    }

    this.users = this.users.filter((currentUser) => currentUser.id !== id);

    return user;
  }

  updateUser({ id, name }) {
    const user = this.users.find((currentUser) => currentUser.id === +id);

    if (!user) {
      return null;
    }

    Object.assign(user, { name });

    return user;
  }
}

module.exports = {
  UserModel: new Users(),
};
