'use strict';

class User {
  constructor() {
    this.users = [];
  };

  init() {
    this.users = [];
  }

  getAll() {
    return this.users;
  };

  getById(userId) {
    return this.users.find(user => user.id === +userId);
  }

  add(name) {
    const maxId = Math.max(...this.users.map(user => user.id), 0);

    const newUser = {
      id: maxId + 1,
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  remove(userId) {
    this.users = this.users.filter(user => user.id !== +userId);
  }

  update(userId, name) {
    const user = this.getById(userId);

    Object.assign(user, { name });

    return user;
  }
}

const userServices = new User();

module.exports = { userServices };
