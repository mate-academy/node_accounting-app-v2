'use strict';

let users = [];

const initiate = (initialUsers) => {
  users = initialUsers;
};

const getAll = () => users;

const getById = (id) => users.find(user => user.id === id) || null;

const getNewId = () => {
  if (!users.length) {
    return 1;
  }

  return Math.max(
    ...users.map(user => user.id)
  ) + 1;
};

const add = (name) => {
  const user = {
    id: getNewId(),
    name,
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = ({ id, name }) => {
  const user = getById(id);

  return Object.assign(user, { name });
};

module.exports = {
  initiate,
  add,
  remove,
  getAll,
  getById,
  update,
};
