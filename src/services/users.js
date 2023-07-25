'use strict';

const utils = require('../utils/utils.js');

let users = [];

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const create = (userName) => {
  const newUser = {
    id: utils.getRandomId(),
    name: userName,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const edit = (userId, newData) => {
  users = users.map(user => {
    if (user.id !== +userId) {
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
  users,
};
