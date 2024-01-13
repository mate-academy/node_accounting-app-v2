'use strict';

let expenses = [];

const getAll = ({ userId, categories, from, to } = {}) => {
  return expenses.filter(item => {
    return userId ? userId === item.userId : true
    && !!categories ? categories.includes(item.category) : true
    && from ? new Date(from) > new Date(item.spentAt) : true
    && to ? new Date(to) < new Date(item.spentAt) : true;
  });
};

const getOne = (id) => {
  return expenses.find(item => item.id === id) || null;
};

const create = (data) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note = null,
  } = data;

  const id = Math.max(...expenses.map(item => item.id), 0) + 1;

  const newExpense = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter(item => item.id !== id);
};

const update = ({ id, name }) => {
  const item = getOne(id);

  Object.assign(item, { name });

  return item;
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
