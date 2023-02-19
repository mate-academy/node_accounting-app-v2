'use strict';

const users = [];

const getUsers = () => users;

const getUserById = (id) => users.find((user) => user.id === id) || null;

const addUser = (name) => {
  if (!name) {
    return null;
  }

  const newUser = {
    name,
    id: users.length + 1,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (id) => {
  const user = getUserById(id);

  if (user) {
    users.filter((u) => u.id !== id);
  }
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  if (user) {
    user.name = name;
  }

  return user;
};

module.exports = {
  getUsers,
  getUserById,
  removeUser,
  addUser,
  updateUser,
};
