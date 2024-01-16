'use strict';

let users = [];

const getAllUsers = () => users;

const getUserById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const addNewUser = (name) => {
  const newId = users.length
    ? Math.max(...users.map((user) => user.id)) + 1
    : 0;

  const newUser = {
    id: newId,
    name: name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (id) => {
  const newUsers = users.filter(user => user.id !== +id);

  users = newUsers;
};

const clearUsers = () => {
  users = [];
};

const updateUser = (user, name) => Object.assign(user, { name });

module.exports = {
  updateUser,
  clearUsers,
  removeUser,
  getUserById,
  getAllUsers,
  addNewUser,
};
