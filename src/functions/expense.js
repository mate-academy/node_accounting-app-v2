'use strict';

const expenses = [];

const init = () => {
  expenses.length = 0;
};

const getData = () => expenses;

const add = (user) => {
  expenses.push(user);
};

const getById = (userId) => expenses.find(({ id }) => id === userId) || null;

const remove = (userId) => expenses.filter(({ id }) => id !== userId);

const isIncludes = (userId) => expenses.some(({ id }) => id === userId);

const update = (user, updateData) => {
  Object.assign(user, updateData);
};

module.exports = {
  init,
  getData,
  add,
  getById,
  remove,
  isIncludes,
  update,
};
