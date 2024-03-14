'use strict';

let users = [];

const clearUsers = () => {
  users.length = 0;
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  const user = users.find(u => u.id === +id);

  return user;
};

const createUser = (name) => {
  const user = {
    id: users.length > 0
      ? +(users[users.length - 1].id) + 1 : users.length + 1,
    name,
  };

  users.push(user);

  return user;
};

const updateUser = (id, name) => {
  users = users.map(user => {
    if (user.id === +id) {
      user.name = name;

      return user;
    }

    return user;
  });

  const changedUser = users.find(u => u.id === +id);

  return changedUser;
};

const deleteUser = (id) => {
  if (users.some(user => user.id === +id)) {
    users = users.filter(u => u.id !== +id);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  clearUsers,
  createUser,
  deleteUser,
  updateUser,
};
