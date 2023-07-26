'use strict';

const { generateId } = require('../utils/generateId');

let users = [];

function setInitialUsers() {
  users = [];
}

class UserService {
  async getAll() {
    return users;
  }

  async getById(userId) {
    return users.find(user => user.id === userId);
  }

  async create(name) {
    const newId = generateId(users);
    const newUser = {
      id: newId,
      name,
    };

    await users.push(newUser);

    return newUser;
  }

  async remove(userId) {
    users = users.filter(user => user.id !== userId);
  }

  async update({ id, name }) {
    const user = await this.getById(id);

    Object.assign(user, { name });

    return user;
  }
}

module.exports = {
  UserService,
  setInitialUsers,
};
