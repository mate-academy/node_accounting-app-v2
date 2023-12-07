'use strict';

let usersFromServer = [];

const findAll = () => usersFromServer;

const getById = (id) => (
  usersFromServer.find(u => u.id === id) || null
);

const createOne = (name) => {
  const newUser = {
    id: getMaxId(usersFromServer) + 1,
    name,
  };

  usersFromServer.push(newUser);

  return newUser;
};

const getMaxId = (users) => users.length > 0
  ? Math.max(...users.map(u => u.id))
  : 0;

const deleteOne = (id) => {
  usersFromServer = usersFromServer.filter(u => u.id !== id);
};

const updateOne = (users, name) => {
  Object.assign(users, { name });

  return users;
};

const setAll = (newUser) => {
  usersFromServer = newUser;
};

const validate = (name) => {
  return typeof name === 'string';
};

const clearUsers = () => {
  usersFromServer = [];
};

module.exports = {
  findAll,
  getById,
  createOne,
  deleteOne,
  updateOne,
  setAll,
  validate,
  clearUsers,
};
