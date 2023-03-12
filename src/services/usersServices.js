'use strict';

let users = [];

const getInitialUsers = () => {
  users = [];
};

const getAllUsers = () => users;

const addUser = (name) => {
  const newUser = {
    id: Math.max(...users.map(user => user.id), 0) + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const getUserById = (id) => {
  const foundUser = users.find(user => user.id === id) || null;

  return foundUser;
};

const deleteUser = (id) => {
  const filtredUsers = users.filter(user => user.id !== id);

  if (filtredUsers.length === users.length) {
    return false;
  }

  users = filtredUsers;

  return true;
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  usersServices: {
    getAllUsers,
    addUser,
    getUserById,
    deleteUser,
    updateUser,
    getInitialUsers,
  },
};
