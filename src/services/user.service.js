'use strict';

let users = [];

const getAll = () => users;

const getByUserId = id => users.find(u => u.id === +id) || null;

const createUser = name => {
  const newUser = {
    id: users.length,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = id => users.filter(user => user.id !== +id);

const updateUser = (user, name) => Object.assign(user, { name });

const setAll = newUsers => {
  users = newUsers;
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getAll,
  getByUserId,
  createUser,
  deleteUser,
  setAll,
  clearUsers,
  updateUser,
};
