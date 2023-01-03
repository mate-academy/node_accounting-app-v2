'use strict';

let users = [];

const getAll = () => users;

const getById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const create = (userName) => {
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 0,
    name: userName,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const update = (userId, userName) => {
  const user = getById(userId);

  user.name = userName;

  return user;
};

const clear = () => {
  users = [];
};

module.exports = {
  getAll, getById, create, remove, update, clear,
};
