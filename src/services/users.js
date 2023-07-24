'use strict';

const users = [];

const getUserById = (userId) => {
  const foundUser = users.find((user) => user.id === Number(userId));

  return foundUser || null;
};

const getUsers = () => {
  return users;
};

const addUser = (name) => {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const updateUser = (userId, name) => {
  const updatedUser = getUserById(userId);

  if (!updatedUser) {
    return null;
  }

  updatedUser.name = name;

  return updatedUser;
};

const deleteUser = (userId) => {
  const userIndex = users.findIndex((user) => user.id === Number(userId));

  if (userIndex === -1) {
    return false;
  }

  users.splice(userIndex, 1);

  return true;
};

module.exports = {
  users,
  getUserById,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
