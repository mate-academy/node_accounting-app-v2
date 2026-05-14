'use strict';

let users = [];
let userId = 1;

const usersService = {
  clear() {
    users = [];
    userId = 1;
  },

  create(name) {
    const user = {
      id: userId,
      name,
    };

    users.push(user);
    userId += 1;

    return user;
  },

  getAll() {
    return users;
  },

  getById(id) {
    return users.find((u) => u.id === id);
  },

  update(id, data) {
    const user = this.getById(id);

    if (!user) {
      return null;
    }

    if (data.name !== undefined) {
      user.name = data.name;
    }

    return user;
  },

  delete(id) {
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return false;
    }
    users.splice(index, 1);

    return true;
  },
};

module.exports = usersService;
