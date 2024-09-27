'use strict';

const USERS = [];

const getAll = () => USERS;

const createUser = (name) => {
  const id = USERS.length === 0 ? 1 : USERS[USERS.length - 1].id + 1;
  const user
  = {
    id, name,
  };

  USERS.push(user);

  return user;
};

const getUserById = (userId) => USERS.find(user => user.id === +userId);

const removeUser = (userId) => {
  const index = USERS.findIndex(user => user.id === +userId);

  if (index !== -1) {
    USERS.splice(index, 1);
  }
};

const updateUser = (userId, name) => {
  const user = getUserById(userId);

  if (user) {
    user.name = name;
  }

  return user;
};

const resetUser = () => USERS.splice(0);

module.exports = {
  getAll,
  createUser,
  getUserById,
  removeUser,
  updateUser,
  resetUser,
};
