'use strict';

let users = [];

const init = () => {
  users.length = 0;
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  const userById = users.find(user => user.id === +id);

  return userById;
};

const createUser = (name) => {
  const id = Date.now();
  const user = {
    id, name,
  };

  users.push(user);

  return user;
};

const deleteUser = (id) => {
  users = users.filter(user => user.id !== +id);
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  user.name = name;

  return user;
};

module.exports = {
  init,
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
