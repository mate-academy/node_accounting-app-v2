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

const getById = (id) => {
  const foundUser = users.find((user) => user.id === id) || null;

  return foundUser;
};

const deleteById = (id) => {
  const deletedUser = users.find((user) => user.id === id) || null;

  users = users.filter((user) => user.id !== id);

  return deletedUser;
};

const updateUser = (id, name) => {
  const user = getById(id);

  if (!user) {
    return null;
  }

  user.name = name;

  return user;
};

const clearDataBase = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  createUser,
  getById,
  deleteById,
  updateUser,
  clearDataBase,
};
