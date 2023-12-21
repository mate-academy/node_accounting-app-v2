'use strict';

let users = [];

const getUsers = () => users;

const getUserById = (id) => {
  const normalizedId = parseInt(id);

  return users.find(user => user.id === normalizedId) || null;
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
  const normalizedId = parseInt(id);

  users = users.filter(user => user.id !== normalizedId);
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

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
