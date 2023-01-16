'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  const foundUser = users.find(({ id }) => id === +userId);

  return foundUser || null;
};

const createUser = (name) => {
  const maxId = Math.max(...users.map(({ id }) => id), 0);
  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter(({ id }) => id !== +userId);
};

const updateUser = (userId, name) => {
  const foundUser = getUserById(+userId);

  Object.assign(foundUser, { name });

  return foundUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
