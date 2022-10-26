'use strict';

let users = [];

const newId = () => (
  users.length
    ? [...users.sort((a, b) => b.id - a.id)][0].id + 1
    : 1
);

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const create = (name) => {
  const newUser = {
    id: newId(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const update = (userId, name) => {
  const foundUser = getById(userId);

  foundUser.name = name;

  return foundUser;
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
