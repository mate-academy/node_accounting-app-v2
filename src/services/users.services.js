'use strict';

const { nextId } = require('../helpers/helpers');
let users = [];

const findUsers = () => {
  return users;
};

const createUser = (userName) => {
  const user = {
    id: nextId(users),
    name: userName,
  };

  users.push(user);

  return user;
};

const findUser = (id) => {
  return users.find(person => person.id === id);
};

const removeUser = (id) => {
  const newUsers = users.filter(person => person.id !== id);

  users = newUsers;
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  findUsers,
  createUser,
  findUser,
  removeUser,
  clearUsers,
};
