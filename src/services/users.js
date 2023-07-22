'use strict';

const utils = require('../utils/utils.js');

class User {
  constructor(name) {
    this.id = utils.getRandomId();
    this.name = name;
  }
}

let users = [];

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const create = (userName) => {
  const newUser = new User(userName);

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  if (!getById(userId)) {
    return false;
  }

  users = users.filter(user => user.id !== userId);

  return true;
};

const edit = (userId, newData) => {
  users = users.map(user => {
    if (user.id !== userId) {
      return user;
    }

    return Object.assign(user, newData);
  });

  const editedUser = getById(userId);

  return editedUser;
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  edit,
};
