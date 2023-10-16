'use strict';

let users = [];

const getAll = () => {
  return users;
};

const add = user => {
  users.push(user);
};

const getById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const create = (name) => {
  const user = {
    id: new Date().getTime(),
    name,
  };

  users.push(user);

  return user;
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter(user => user.id !== +id);
};

const clear = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  add,
  create,
  update,
  remove,
  clear,
};
