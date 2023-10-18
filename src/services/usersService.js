'use strict';

let users = [];

const clear = () => (users = []);
const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find(user => user.id === id);
};

const addUser = (user) => {
  users.push(user);

  return user;
};

const removeUser = (id) => {
  users = users.filter(user => user.id !== id);
};

module.exports = {
  clear,
  getAllUsers,
  getUserById,
  addUser,
  removeUser,
};
