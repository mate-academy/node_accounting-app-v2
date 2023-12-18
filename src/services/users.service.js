'use strict';

let users = [];
const getAllUsers = () => {
  return users;
};
const getUserById = (id) => {
  return users.find(user => user.id === id);
};

const addUser = (newUser) => {
  users.push(newUser);

  return users;
};

const updateUser = (id, name) => {
  const expense = getUserById(id);

  Object.assign(expense, { name });

  return expense;
};
const deleteUser = (id) => {
  users = users.filter(user => user.id !== id);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
