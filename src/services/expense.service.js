'use strict';

let expenses = [];

const readAll = (params) => {
  const { userId, categories, from, to } = params;
  let filtered = expenses;

  if (userId) {
    filtered = filtered.filter(expense => expense.userId === userId);
  }

  if (categories && categories.length > 0) {
    filtered = filtered.filter(expense => categories
      .includes(expense.category));
  }

  if (from) {
    filtered = filtered.filter(expense => expense.spentAt > from);
  }

  if (to) {
    filtered = filtered.filter(expense => expense.spentAt < to);
  }

  return filtered;
};

const read = (id) => {
  return expenses.find(expense => expense.id === id);
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: expenses.length + 1,
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
  expenses = expenses.filter(user => user.id !== id);
};

const update = (id, params) => {
  const expense = read(id);

  return Object.assign(expense, {
    id, ...params,
  });
};

module.exports = {
  readAll,
  read,
  create,
  remove,
  update,
};
