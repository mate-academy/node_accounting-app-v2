'use strict';

const { getNewId } = require('./../utils/getNewId');

let users = [];

const get = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id);
};

const create = (name) => {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = (id, name) => {
  const userToUpdate = getById(id);
  const updatedUser = {
    ...userToUpdate,
    name,
  };

  const index = users.indexOf(userToUpdate);

  users[index] = updatedUser;

  return updatedUser;
};

const clear = () => {
  users = [];
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  clear,
};
