'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const getUser = (id) => {
  const user = users.find(currentUser => currentUser.id === id);

  return user || null;
};

const createUser = (name) => {
  const newUser = {
    id: Math.floor(Math.random() * 1000 - 1) + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (id) => {
  users = users.filter(user => user.id !== id);
};

const updateUser = ({ id, name }) => {
  const user = getUser(id);

  Object.assign(user, { name });

  return user;
};

const reset = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  removeUser,
  updateUser,
  reset,
};
