'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  const user = users.find(el => el.id === userId) || null;

  return user;
};

const createUser = (name) => {
  const userId = users.length ? users[users.length - 1].id : 0;
  const user = {
    id: userId + 1,
    name,
  };

  users.push(user);

  return user;
};

const deletUser = (id) => {
  users = users.filter(user => user.id !== id);
};

const editNameOfUser = (userToUpdate, name) => {
  return Object.assign(userToUpdate, { name });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deletUser,
  editNameOfUser,
};
