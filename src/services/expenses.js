'use strict';

let expenses = [];

const initiate = () => {
  expenses = [];
};

const getAll = (queryParams) => {
  const { userId, categories, from, to } = queryParams;

  let filteredExpenses = [...expenses];

  const category = Array.isArray(categories)
    ? categories
    : [categories];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => category.includes(expense.category));
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt > from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt < to);
  }

  return filteredExpenses;
};

const getById = (id) => {
  const foundExpense = expenses.find(expense => expense.id === id);

  return foundExpense;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const ids = expenses.map(expense => expense.id);

  const newExpenses = {
    id: Math.max(...ids, 0) + 1,
    // ...req.body,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpenses);

  return newExpenses;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const update = (bodyParams, foundExpenses) => {
  for (const param in bodyParams) {
    foundExpenses[param] = bodyParams[param];
  }

  return foundExpenses;
};

module.exports = {
  create,
  remove,
  getAll,
  getById,
  update,
  initiate,
};
