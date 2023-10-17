'use strict';

let users = [];

const clearUsers = () => {
  users = [];
};

const getAll = () => users;

const addUser = name => {
  const user = {
    id: +new Date(),
    name,
  };

  users.push(user);

  return user;
};

const getById = id => {
  return users.find(user => id === user.id) || null;
};

const deleteById = id => {
  if (getById(id)) {
    users = users.filter(user => user.id !== id);

    return true;
  }

  return false;
};

const updateById = ({ id, name }) => {
  const user = getById(id);

  if (user) {
    user.name = name;

    return user;
  }
};

module.exports = {
  getAll,
  addUser,
  getById,
  deleteById,
  updateById,
  clearUsers,
};
