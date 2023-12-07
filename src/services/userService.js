'use strict';

let users = [];

const getId = () => {
  if (users.length > 0) {
    return Math.max(...users.map(user => user.id)) + 1;
  }

  return 1;
};

const resetUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const create = (name) => {
  const user = {
    name,
    id: getId(),
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  users = users.map(elem => elem.id === id ? user : elem);

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetUsers,
};
