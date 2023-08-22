'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const createUser = (name) => {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const updateUser = ({ id, name }) => {
  const foundUser = getById(id);

  Object.assign(foundUser, { name });

  return foundUser;
};
const removeAll = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  createUser,
  removeUser,
  updateUser,
  removeAll,
};
