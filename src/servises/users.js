'use strict';

let users = [];
let nextUserId = 1;

const getAll = () => {
  return users || [];
};

const findUser = (userId) => {
  return users.find(user => user.id === userId) || null;
};

const createUser = (name) => {
  const id = nextUserId++;
  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const updateUser = (updatedUser, userId) => {
  users = users.map(user => {
    if (user.id === userId) {
      return updatedUser;
    }

    return user;
  });
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getAll,
  findUser,
  createUser,
  deleteUser,
  updateUser,
  clearUsers,
};
