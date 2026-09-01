'use strict';

let expenses = [];
let nextId = 0;

const getAll = ({ userId, categories, from, to }) => {
  let result = expenses;

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (from) {
    result = result.filter((e) => e.spentAt >= from);
  }

  if (to) {
    result = result.filter((e) => e.spentAt <= to);
  }

  if (categories) {
    result = result.filter((e) => {
      return categories.includes(e.category);
    });
  }

  return result;
};

const getById = (id) => {
  return expenses.find((e) => e.id === Number(id)) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: nextId++,
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
  expenses = expenses.filter((e) => e.id !== Number(id));
};

const update = (id, data) => {
  const prevData = getById(id);

  return Object.assign(prevData, data);
};

const reset = () => {
  expenses = [];
  nextId = 0;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
