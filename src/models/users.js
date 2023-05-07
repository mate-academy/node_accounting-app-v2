'use strict';

class Users {
  constructor() {
    this.users = [
      {
        id: 0,
        name: 'John Doe',
      },
    ];
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

  updateUser({ id, name }) {
    const user = this.users.find(currentUser => currentUser.id
      === +id);

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
