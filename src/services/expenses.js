'use strict';

let expenses = [];

const init = () => {
  expenses = [];
};

const getAll = (category, from, to) => {
  let filteredExpenses = expenses;

  if (category) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === category);
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from && expense.spentAt <= to);
  }

  return filteredExpenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
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

const remove = (expenseId) => {
  const filteredExpenses = expenses
    .filter(expense => expense.id !== +expenseId);

  expenses = filteredExpenses;
};

const update = (expenseId, title) => {
  const foundExpense = getById(expenseId);

  Object.assign(foundExpense, { title });
};

module.exports = {
  init,
  getAll,
  getById,
  create,
  remove,
  update,
};
