'use strict';

let users = [];

const getAll = () => users;

const createUser = (newUser) => {
  users.push(newUser);
};

const foundUser = (userId) => {
  return users.find(user => user.id === Number(userId));
};

const changeAll = (filteredUsers) => {
  users = filteredUsers;
};

const changeOne = (findUser, name) => {
  Object.assign(findUser, { name });
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll, createUser, foundUser, changeAll, changeOne, reset,
};
