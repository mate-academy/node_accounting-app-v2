'use strict';

const users = [];

const init = () => {
  users.length = 0;
};

const getData = () => users;

const add = (user) => {
  users.push(user);
};

const getById = (userId) => users.find(({ id }) => id === userId) || null;

const remove = (userId) => users.filter(({ id }) => id !== userId);

const update = (user, updateData) => {
  Object.assign(user, updateData);
};

const isIncludes = (userId) => users.some(({ id }) => id !== userId);

module.exports = {
  init,
  getData,
  add,
  getById,
  remove,
  update,
  isIncludes,
};
