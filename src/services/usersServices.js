'use strict';

let users = [];

const getAll = () => users;

const createUser = (newUser) => {
  users.push(newUser);
};

const findUserById = (userId) => {
  return users.find(user => user.id === Number(userId));
};

const updateUsersList = (filteredUsers) => {
  users = filteredUsers;
};

const update = (findUser, name) => {
  Object.assign(findUser, { name });
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  createUser,
  findUserById,
  updateUsersList,
  update,
  reset,
};
