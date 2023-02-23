'use strict';

let users = [];

const init = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const findById = (userId) => {
  const foundUser = users.find(user => {
    return user.id === userId;
  });

  return foundUser || null;
};

const create = (name) => {
  const id = users.length
    ? Math.max(...users.map(user => user.id)) + 1
    : 1;

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== userId);

  return users;
};

const update = ({ id, name }) => {
  const user = findById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  init,
  getAll,
  findById,
  create,
  remove,
  update,
};
