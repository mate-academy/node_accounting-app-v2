'use strict';

let users = [];

const findUserService = (id) => {
  return users.find(user => user.id === +id) || null;
};

const createUserService = (name) => {
  const newUser = {
    id: users.length + 1, name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUserService = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

module.exports = {
  findUserService,
  createUserService,
  deleteUserService,
  users,
};
