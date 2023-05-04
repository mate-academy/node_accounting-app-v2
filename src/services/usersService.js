'use strict';

let users = [];

const getInitial = () => {
  users = [];

  return users;
};

const getAllUsers = () => users;

const getUserById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const createUser = (name) => {
  const newUser = {
    id: Math.max(...users.map(user => user.id), 0) + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getInitial,
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
