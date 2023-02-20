'use strict';

function findNewId() {
  return Math.max(...users.map(user => user.id), 0) + 1;
}

let users = [];

const clearUsers = () => {
  users = [];
};

const getAll = () => users;

const getById = (userId) => users.find(user => user.id === +userId) || null;

const create = (name) => {
  const newUser = {
    name,
    id: findNewId(),
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const update = ({ userId, fieldsForUpdate }) => {
  const user = getById(userId);

  Object.assign(user, { ...fieldsForUpdate });

  return user;
};

module.exports = {
  getAll, getById, create, remove, update, clearUsers,
};
