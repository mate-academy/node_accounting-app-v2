'use strict';

let users = [];

const setInitUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (userId) => {
  return users.find(({ id }) => id === userId);
};

const create = (name) => {
  const id = Math.max(...users.map((user) => user.id), 0) + 1;

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  const filteredUsers = users.filter(({ id }) => id !== userId);

  const prevLength = users.length;

  users = filteredUsers;

  return users.length !== prevLength;
};

const update = (userId, name) => {
  const userToUpdate = getById(userId);

  if (!userToUpdate) {
    return false;
  }

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

const usersServices = {
  getAll,
  getById,
  create,
  remove,
  update,
  setInitUsers,
};

module.exports = {
  usersServices,
  users,
};
