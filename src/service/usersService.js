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

    const result = this.users.find(
      (user) => Number(user.id) === Number(userId),
    );

    return result || null;
  }

  updateUser(userId, updatedName) {
    const normalizeId = Number(userId);
    const user = this.getById(normalizeId);

    if (updatedName === null && !updatedName) {
      return null;
    }

    if (!user) {
      return null;
    }

    Object.assign(user, { name: updatedName });

    return user;
  }

  addUser(userName) {
    const id = Users.count;

    if (userName === null && !userName.trim()) {
      return null;
    }

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

    this.users = this.users.filter(
      (user) => Number(user.id) !== Number(userId),
    );

    return true;
  }
}

module.exports = Users;
