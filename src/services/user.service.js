/* eslint-disable no-console */
'use strict';

const users = [];

const getUsers = () => {
  return users;
};

const getById = (id) => {
  return users.find(u => u.id === +id);
};

const createUser = (title) => {
  const user = {
    id: users.length,
    name: title,
  };

  users.push(user);

  return user;
};

const deleteUser = (id) => {
  const userIndex = users.findIndex(u => u.id === +id);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];

    return deletedUser;
  }

  return null;
};

const updateUser = (id, title) => {
  const user = getById(id);

  if (user) {
    user.name = title;

    return user;
  }

  return null;
};

const setInitialValue = () => {
  users.length = 0;
};

module.exports = {
  getUsers,
  getById,
  createUser,
  deleteUser,
  updateUser,
  setInitialValue,
};
