'use strict';

let users = [];
let id = 0;

const getAll = () => users;

const create = (name) => {
  const newUser = {
    id: id++,
    name,
  };

  users.push(newUser);

  return newUser;
};

const getById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);

  return users;
};

const update = ({ userId, name }) => {
  const user = getById(userId);

  Object.assign(user, { name });

  return user;
};

const clear = () => {
  users = [];
};

module.exports = {
  getAll, create, getById, remove, update, clear,
};
