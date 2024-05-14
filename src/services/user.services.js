'use strict';

let users = [];

const getUsers = () => {
  return users;
};

const getUserById = (id) => {
  const oneUser = users.find((user) => user.id === Number(id));

  return oneUser;
};

const createUser = (name) => {
  const newUser = {
    id: Date.now(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

const resetUsers = () => {
  users = [];
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  resetUsers,
};
