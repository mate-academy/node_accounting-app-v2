'use strict';

let users = [];

const initial = () => {
  users = [];

  return users;
};

const getAll = () => users;

const create = (name) => {
  const maxId = users.length
    ? Math.max(...users.map(el => el.id))
    : 0;

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const findById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);

  return users;
};

const change = (id, name) => {
  const foundUser = findById(id);

  Object.assign(foundUser, { name });

  return foundUser;
};

module.exports = {
  getAll, create, findById, remove, change, initial,
};
