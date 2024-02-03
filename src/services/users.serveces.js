'use strict';

const { v4 } = require('uuid');

let users = [];

const getUsers = () => users;

const createUser = (name) => {
  const user = {
    name,
    id: v4(),
  };

  users.push(user);

  return user;
};

const getUser = (id) => {
  return users.find(user => user.id === id) || null;
};

const deleteUser = (id) => {
  const newUsers = users.filter(user => user.id !== id);

  users = newUsers;
};

const updateUser = ({ id, name }) => {
  const user = getUser(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
