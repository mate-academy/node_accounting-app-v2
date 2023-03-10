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

const findById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const remove = (userId) => {
  const initialLength = users.length;

  users = users.filter(user => user.id !== +userId);

  const finalLength = users.length;

  return finalLength < initialLength;
};

const update = ({ userId, name }) => {
  const user = findById(userId);

  Object.assign(user, { name });

  return user;
};

const clear = () => {
  users = [];
};

module.exports = {
  getAll, create, findById, remove, update, clear,
};
