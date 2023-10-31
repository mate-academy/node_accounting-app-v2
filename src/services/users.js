'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getUserById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const create = (name) => {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter(user => user.id !== +id);
};

const update = ({ id, name }) => {
  const foundUser = getUserById(id);

  Object.assign(foundUser, { name });

  return foundUser;
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getUserById,
  getAll,
  create,
  remove,
  clearUsers,
  update,
};
