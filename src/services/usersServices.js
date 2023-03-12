'use strict';

let users = [];

const getDefault = () => (
  users = []
);

const getAllUsers = () => users;

const getUserById = (userId) => {
  return users.find(user => user.id === userId) || null;
};

const addNewUser = (name) => {
  const newUser = {
    id: Math.max(0, ...users.map(user => user.id)) + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  const filteredUsers = users.filter(user => user.id !== userId);

  if (users.length === filteredUsers.length) {
    return false;
  }

  users = filteredUsers;

  return true;
};

const updateUser = (userId, name) => {
  const user = getUserById(userId);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  userServices: {
    getAllUsers,
    getDefault,
    getUserById,
    addNewUser,
    deleteUser,
    updateUser,
  },
};
