'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getById = (userId) => {
  return users.find(user => user.id === Number(userId)) || null;
};

const create = (name) => {
  const user = {
    name,
    id: users.length,
  };

  users.push(user);

  return user;
};

const update = ({ id, name }) => {
  const user = getById(Number(id));

  Object.assign(user, { name });

  return user;
};

const deleteById = (userId) => {
  users = users.filter(user => user.id !== Number(userId));
};

const clearAll = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  clearAll,
};
