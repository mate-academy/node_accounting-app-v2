'use strict';

let users = [];

const getMaxId = (array) => {
  const maxId = Math.max(array.map(({ id }) => id)) + 1;

  return maxId;
};

const resetUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getByUserId = (id) => {
  return users.find(user => user.id === Number(id));
};

const createUser = (name) => {
  const newUser = {
    id: getMaxId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users
    .filter(user => user.id !== Number(userId));
};

const updateUser = (userId, name) => {
  const user = getByUserId(userId);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAllUsers,
  getByUserId,
  createUser,
  deleteUser,
  updateUser,
  resetUsers,
};
