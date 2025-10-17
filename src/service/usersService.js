class Users {
  static count = 0;

  constructor() {
    this.users = [];
  }

  get() {
    return Array.isArray(this.users) ? this.users : [];
  }

  getById(userId) {
    if (this.users.length === 0) {
      return null;
    }

    const result = this.users.find((user) => user.id === userId);

    return result || null;
  }

  updateUser(userId, updatedName) {
    const user = this.getById(userId);

    if (!user) {
      return null;
    }

    Object.assign(user, { name: updatedName });

    return user;
  }

  addUser(userName) {
    const id = Users.count;
    const newUser = {
      name: userName,
      id: id,
    };

    if (this.users.some((u) => u.name === userName)) {
      return null;
    }

    this.users.push(newUser);
    Users.count++;

    return newUser;
  }

  deleteUser(userId) {
    const isExist = this.getById(userId);

    if (!isExist) {
      return null;
    }

    this.users = this.users.filter((user) => user.id !== userId);

    return true;
  }
}

module.exports = Users;
