'use strict';

class UserService {
  constructor(users) {
    this.users = users;
    this.idCounter = 1;
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id) {
    return this.users.find((u) => u.id === id);
  }

  createUser(name) {
    const user = {
      id: this.idCounter++,
      name,
    };

    this.users.push(user);

    return user;
  }

  updateUser(id, name) {
    const user = this.getUserById(id);

    if (user) {
      user.name = name;
    }

    return user;
  }

  deleteUser(id) {
    const index = this.users.findIndex((u) => u.id === id);

    if (index !== -1) {
      this.users.splice(index, 1);

      return true;
    }

    return false;
  }

  userExists(userId) {
    return this.users.some((u) => u.id === userId);
  }
}

module.exports = UserService;
