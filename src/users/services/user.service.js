'use strict';

let users = [];

const getAll = () => {
  return users || [];
};

const clearState = () => {
  users = [];
};

const getUserById = (id) => {
  return users.find(user => user.id === id) || null;
};

const create = (name) => {
  const user = {
    name,
    id: users.reduce((acc, item) => {
      return acc > item.id ? acc : item.id;
    }, 0) + 1,
  };

  users.push(user);

  return user;
};

const update = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

module.exports = {
  getAll,
  getById: getUserById,
  create,
  update,
  remove,
  clearState,
};
