'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getOne = (id) => {
  return users.find(user => user.id === id) || null;
};

const create = ({ name }) => {
  const id = (Math.max(...users.map(item => item.id), 0)) + 1;

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = ({ id, name }) => {
  const user = getOne(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
