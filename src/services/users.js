'use strict';

let users = [];

const initiate = (initialUsers) => {
  users = initialUsers;
};

const getAll = () => users;

const getById = (id) => {
  if (isNaN(id)) {
    throw Error();
  }

  return users.find(user => user.id === id) || null;
};

const getNewId = () => (
  Math.max(
    ...users.map(user => user.id), 0
  ) + 1
);

const add = (name) => {
  if (typeof name !== 'string') {
    throw Error(name);
  }

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

const update = (id, { name }) => {
  const user = getById(id);

  if (typeof name !== 'string') {
    throw Error();
  }

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
