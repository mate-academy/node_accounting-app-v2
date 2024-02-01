'use strict';

let users = [];

const getAllUsers = () => users;

const getUserById = (id) => users.find(user => user.id === +id);

const createUser = (name) => {
  const user = {
    id: Date.now(),
    name,
  };

  users = [...users, user];

  return user;
};

const updateUser = (id, name) => {
  const user = getUserById(+id);

  if (!user) {
    return;
  }

  return {
    ...user, name,
  };
};

const deleteUser = (id) => {
  users = users.filter(user => user.id !== +id);
};

const resetUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  resetUsers,
};
