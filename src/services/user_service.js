'use strict';

const { getNewId } = require('../utils/generateId.js');

let users = [];

const getInitial = () => {
  users = [];
};

const getAll = () => users;

const getById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const create = (name) => {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  userService: {
    getAll,
    create,
    getById,
    remove,
    update,
    getInitial,
  },
};
