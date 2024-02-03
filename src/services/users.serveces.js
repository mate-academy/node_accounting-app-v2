'use strict';

const { v4 } = require('uuid');

let users = [];

const getUsers = () => {
  return users;
};

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
  const updatedUser = {
    ...user,
    name,
  };

  const indexOfUser = users.findIndex(userOne => userOne.id === id);

  users.splice(indexOfUser, 1, updatedUser);

  return updatedUser;
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
