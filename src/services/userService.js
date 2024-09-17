'use strict';

const { generateUniqueID } = require('../helpers.js');
let users = [];
const clearUsers = () => {
  users = [];
};
const findUser = (id) => users.find((user) => user.id === Number(id)) || null;
const getAllUsers = () => users;
const addNewUser = (newUser) => users.push(newUser);
const findIndexOfUser = (id) =>
  users.findIndex((user) => user.id === Number(id));
const deleteUserByIndex = (indexOfUser) => users.splice(indexOfUser, 1);

module.exports = {
  users,
  clearUsers,
  findUser,
  getAllUsers,
  addNewUser,
  findIndexOfUser,
  generateUniqueID,
  deleteUserByIndex,
};
