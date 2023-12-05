'use strict';

let users = []; // ресурс

const clearUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(u => u.id === +id) || null;
};

const createUser = (name) => {
  const user = {
    id: users.length,
    name,
  };

  users.push(user);

  return user;
};

const deleteUser = (id) => {
  return users.filter(user => user.id !== +id);
};

const setAll = (newUsers) => {
  users = newUsers;
};

const changeUser = (user, name) => {
  return Object.assign(user, { name });
};

module.exports = {
  getAll,
  getById,
  createUser,
  deleteUser,
  setAll,
  clearUsers,
  changeUser,
};
