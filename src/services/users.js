'use strict';

const users = [];

const getUsers = () => {
  return users;
};

const getUser = (userId) => {
  return users.find(user => user.id === +userId) || null;
};

const deleteUser = (userId) => {
  const findUser = users.findIndex(user => user.id === +userId);

  if (findUser === -1) {
    return false;
  }

  users.splice(findUser, 1);

  return true;
};

const addUser = (name) => {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const updateUser = (userId, name) => {
  const updatesUser = getUser(userId);

  if (!updateUser) {
    return null;
  }

  updatesUser.name = name;

  return updatesUser;
};

module.exports = {
  users,
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
};
