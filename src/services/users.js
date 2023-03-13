'use strict';

let users = [];

const initiate = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const create = (name) => {
  const maxId = Math.max(...users.map(user => user.id), 0);

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = ({ userId, name }) => {
  const user = getById(userId);

  Object.assign(user, { name });

  return user;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

module.exports = {
  initiate,
  getAll,
  getById,
  create,
  update,
  remove,
};
