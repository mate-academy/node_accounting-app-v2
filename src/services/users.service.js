'use strict';

let users = [];

const getUsers = () => users;

const getUserById = (id) => {
  return users.find(user => user.id === id) || null;
};

const createUser = (name) => {
  const getMaxId = users[users.length - 1].id || 0;

  const user = {
    id: getMaxId + 1,
    name,
  };

  users.push(user);

  return user;
};

const deleteUser = (id) => {
  users = users.filter(user => user.id !== id);
};

const updateUser = ({ normalizedId, name }) => {
  const user = getUserById(normalizedId);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
