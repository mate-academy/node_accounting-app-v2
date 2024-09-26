'use strict';

class UserService {
  static users = [];

  static async getUsers() {
    return this.users;
  };

  static async getUserById(userId) {
    const existingUser = await this.users.find(
      user => user.id === Number(userId),
    );

    return existingUser || null;
  }

  static async createUser(name) {
    const id = await this.users[this.users.length - 1]?.id + 1 || 1;

    const newUser = {
      id,
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  static async deleteUser(userId) {
    this.users = this.users.filter(
      user => user.id !== Number(userId),
    );
  }

  static async updateUser(userId, { name }) {
    const existingUser = await this.getUserById(userId);

    if (existingUser) {
      Object.assign(existingUser, { name });

      return existingUser;
    }

    return null;
  }
}


module.exports = { UserService };
