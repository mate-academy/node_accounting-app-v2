'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const addUser = (name) => {
  const id = users.length
    ? Math.max(...users.map(user => user.id)) + 1
    : 1;

  const newUser = {
    name,
    id,
  };

  users.push(newUser);

  return newUser;
};

const getUserById = (userId) => {
  return users.find(user => user.id === userId);
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const changeUser = (userId, name) => {
  const foundedUser = getUserById(+userId);

  Object.assign(foundedUser, { name });

  return foundedUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  changeUser,
};
