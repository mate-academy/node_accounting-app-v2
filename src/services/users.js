'use strict';

let users = [];

const resetUsers = () => {
  users = [];
};

const getAllUsers = () => users;

const getUserByID = (userID) => {
  const serchedUser = users.find(user => user.id === userID);

  return serchedUser || null;
};

const createUser = (name) => {
  const maxID = Math.max(...users.map(user => user.id));
  const newUser = {
    name,
    id: !maxID ? maxID + 1 : 1,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userID) => {
  users = users.filter(user => user.id !== userID);
};

const updateUser = (name, userID) => {
  const updatedUser = getUserByID(userID);

  Object.assign(updatedUser, { name });

  return updatedUser;
};

module.exports = {
  resetUsers,
  getAllUsers,
  getUserByID,
  createUser,
  removeUser,
  updateUser,
};
