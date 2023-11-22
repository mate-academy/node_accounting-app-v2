'use strict';

let USERS = [];

const createUserId = (id) => {
  const existId = USERS.some(user => user.id === id);

  if (existId) {
    return createUserId(id + 1);
  }

  return id;
};

const getAllUsers = () => {
  return USERS;
};

const getUserById = (id) => {
  return USERS.find(u => u.id === +id) || null;
};

const addUser = (name) => {
  const userID = createUserId(1);

  const newUser = {
    id: userID,
    name,
  };

  USERS.push(newUser);

  return newUser;
};

const updateUserInfo = (user, name) => {
  const newUser = {
    ...user,
    name,
  };

  Object.assign(user, newUser);

  return newUser;
};

const removeUserById = (id) => {
  USERS = USERS.filter(u => u.id !== +id);
};

const clearUsers = () => {
  USERS = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  clearUsers,
  createUserId,
  addUser,
  removeUserById,
  updateUserInfo,
};
