'use strict';

const users = [];

const getUsers = () => users;

const indexOfUser = (userId) => users.findIndex(u => u.id === Number(userId));

const getUserById = (userId) => users.find(u => u.id === userId);

const addUser = (user) => users.push(user);

const deleteUser = (userIndex) => users.splice(userIndex, 1);

const updateUser = (index, name) => (
  users[index] = {
    name,
    ...users[index],
  }
);

const deleteUsers = () => {
  users.length = 0;
};

const usersService = {
  users,
  getUsers,
  getUserById,
  addUser,
  indexOfUser,
  deleteUser,
  updateUser,
  deleteUsers,
};

module.exports = { usersService };
