'use strict';

class User {
  constructor() {
    this.users = [];
  }

  clearAll() {
    this.users = [];
  }

  getAll() {
    return this.users;
  }

  getById(id) {
    const foundUser = this.users.find(user => user.id === +id);

    return foundUser || null;
  }

  createUser(name) {
    const newId = this.users.length
      ? Math.max(...this.users.map(user => user.id))
      : 0;

    const newUser = {
      id: newId + 1,
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  deleteUser(id) {
    this.users = this.users.filter(user => user.id !== +id);
  }

  updateUser({ id, name }) {
    const user = this.getById(id);

    Object.assign(user, { name });

    return user;
  };
}

module.exports = { userService: new User() };
