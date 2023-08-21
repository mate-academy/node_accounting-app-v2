'use strict';

let users = [];

function getAllUsers() {
  return users;
};

const getUserById = (userId) => {
  const foundUser = users.find(user => user.id === parseInt(userId));

  return foundUser || null;
};

const createUser = (name) => {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== parseInt(userId));
};

const updateUser = ({ id, name }) => {
  const updatedUser = getUserById(parseInt(id));

  Object.assign(updatedUser, {
    id,
    name,
  });

  return updatedUser;
};

function clearUsers() {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  clearUsers,
};
