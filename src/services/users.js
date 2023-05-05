'use strict';

let users = [];

const init = () => {
  users = [];
};

const getAll = () => users;

const getById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const create = (name) => {
  const ids = users.map(user => user.id);

  const maxId = users.length
    ? Math.max(...ids)
    : 0;

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const update = (userId, name) => {
  const foundUser = getById(userId);

  Object.assign(foundUser, { name });
};

module.exports = {
  init,
  getAll,
  getById,
  create,
  remove,
  update,
};
