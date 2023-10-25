'use strict';

const users = [];

const getUsers = () => users;

const getUser = (userId) => users.find(person => person.id === userId);

const createUser = (newUser) => users.push(newUser);

const userIndex = (id) => users.findIndex(person => person.id === id);

const updateUserName = (index, name) => (
  users[index] = {
    ...users[index],
    name,
  }
);

const deleteUser = (index) => users.splice(index, 1);

const getId = () => Math.max(...users.map(person => person.id)) + 1;

const getAllIds = () => users.map(user => user.id);

const clear = () => {
  users.length = 0;
};

const userServices = {
  getUsers,
  getUser,
  createUser,
  userIndex,
  updateUserName,
  deleteUser,
  getId,
  getAllIds,
  clear,
};

module.exports = {
  userServices,
};
