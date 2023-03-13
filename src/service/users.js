'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getUser = (userId) => {
  return users.find(user => user.id === userId) || null;
};

const updateUser = (userId, updatedName) => {
  let foundUser = getUser(userId);

  foundUser = {
    ...foundUser,
    name: updatedName,
  };

  return foundUser;
};

const deleteUser = (userId) => {
  const filteredUsers = users.filter(user => user.id !== userId);

  users = filteredUsers;
};

const addUser = (userName) => {
  const newUser = {
    id: Math.max(users.map(user => user.id)) + 1,
    name: userName,
  };

  users.push(newUser);

  return newUser;
};

module.exports = {
  getAll,
  getUser,
  updateUser,
  deleteUser,
  addUser,
};
