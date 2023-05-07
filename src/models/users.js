'use strict';

class User {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
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
    this.users = this.users.filter(user => user.id !== id);
  }

  removeUsers(ids) {
    if (!ids.every(id => this.users.find((user) => user.id === id))) {
      throw new Error('Invalid id');
    }

    this.users = this.users.filter(user => !ids.includes(user.id));
  }

  updateUser({ id, name }) {
    const user = this.users.find(currentUser => currentUser.id
      === id);

    Object.assign(user, { name });

    return user;
  }

  updateUsers(ids) {
    const results = [];
    const errors = [];

    const currentUsers = this.users
      .filter(currentUser => ids.includes(currentUser.id));

    for (const { id, name } of currentUsers) {
      const user = currentUsers[id];

      if (user) {
        Object.assign(user, ({ name }));

        results.push({
          id,
          status: 'success',
        });
      } else {
        errors.push({
          id,
          status: 'ERROR',
        });
      }
    }

    return {
      results,
      errors,
    };
  }
}

module.exports = {
  UserModel: new User(),
};
