'use strict';

const { getNewId } = require('../helpers');

let users = [];
const setInitialUsers = () => {
  users = [];
};

class UserService {
  findById(id) {
    return users.find(person => person.id === +id) || null;
  }

  create(name) {
    const newUser = {
      id: getNewId(users),
      name,
    };

    users.push(newUser);

    return newUser;
  }

  findAll() {
    return users;
  }

  remove(id) {
    users = users.filter(user => user.id !== +id);
  }

  update({ id, name }) {
    const user = this.findById(id);

    Object.assign(user, { name });

    return user;
  }
}

module.exports = {
  UserService,
  setInitialUsers,
};
