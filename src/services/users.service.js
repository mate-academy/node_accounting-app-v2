'use strict';

let users = [];

const createUser = (name) => {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const updateUser = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const removeUser = (id) => {
  users = users.filter(user => user.id !== +id);
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  createUser,
  getAll,
  getById,
  updateUser,
  removeUser,
  clearUsers,
};
