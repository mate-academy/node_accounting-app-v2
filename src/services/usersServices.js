'use strict';

let users = [];

const getUsers = () => users;

const getUser = (id) => {
  return users.find(user => user.id === id);
};

const createUser = (name) => {
  const user = {
    id: +new Date(),
    name,
  };

  users.push(user);

  return user;
};

const updateUser = (id, name) => {
  const user = getUser(id);

  if (!user) {
    return;
  }

  Object.assign(user, { name });

  return user;
};

const deleteUser = (id) => {
  users = users.filter(expense => expense.id !== id);
};

const deleteAllUsers = () => {
  users = [];
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
