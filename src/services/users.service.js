const { getNumberId } = require('./../utils');

class Users {
  constructor(initialUsers) {
    this._users = initialUsers || [];
  }

  getAll() {
    return this._users;
  }

  getById(id) {
    return this._users.find((user) => user.id === id) || null;
  }

  create(data) {
    const newUser = { ...data, id: getNumberId() };

    this._users.push(newUser);

    return newUser;
  }

  update(id, data) {
    const userToUpdate = this.getById(id);

    Object.assign(userToUpdate, { ...data });

    return userToUpdate;
  }

  deleteOne(id) {
    this._users = this._users.filter((user) => user.id !== id);
  }

  reset() {
    this._users.length = 0;
  }
}

module.exports = new Users();
