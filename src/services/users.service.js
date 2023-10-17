'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const createUser = (name) => {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const getUserById = (id) => {
  return users.find((item) => item.id === Number(id));
};

const removeUser = (id) => {
  users = users.filter(user => user.id !== Number(id));
};

const clearUsers = () => {
  users = [];
};

const updateUser = ({ id, name }) => {
  const foundUser = getUserById(id);

  Object.assign(foundUser, { name });

  return foundUser;
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUser,
  clearUsers,
  updateUser,
};
