'use strict';

let users = [];

const init = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const user = users.find(({ id }) => +id === +userId);

  return user;
};

const create = (name) => {
  const maxId = Math.max(users.map(user => +user.id), 0);

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = (userId, name) => {
  const user = getById(userId);

  Object.assign(user, { name });
};

const remove = (userId) => {
  users = users.filter(({ id }) => +id !== +userId);
};

module.exports = {
  init,
  getAll,
  getById,
  create,
  update,
  remove,
};
