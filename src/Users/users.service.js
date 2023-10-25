'use strict';

let users = [];

const clearUsers = () => (users = []);

const getAllUsers = () => (users);

const getUser = (userId) => {
  users.find(u => u.id === Number(userId));
};

const postUser = (newUser) => {
  users.push(newUser);
};

const patchUser = (userId, name) => {
  const user = users.find(u => u.id === Number(userId));
  const changedUser = {
    ...user,
    name,
  };

  users = users.filter(u => u.id !== Number(userId));
  users.push(changedUser);
};

const deleteUser = (userId) => {
  users = users.filter(u => u.id !== Number(userId));
};

const usersService = {
  getUser,
  getAllUsers,
  postUser,
  patchUser,
  deleteUser,
};

module.exports = {
  usersService,
  clearUsers,
};
