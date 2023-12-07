'use strict';

const users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const create = (name) => {
  const newId = Math.max(users.map(userId => +userId.id)) + 1;

  const user = {
    id: +newId,
    name,
  };

  users.push(user);

  return user;
};

const update = (id, name) => {
  const foundUser = getById(id);

  const newUser = {
    ...foundUser,
    name,
  };

  return newUser;
};

const remove = (id) => {
  users.filter(user => user.id !== +id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
