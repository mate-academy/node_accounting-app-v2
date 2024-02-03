'use strict';

const { v4 } = require('uuid');

let expenses = [];

const getExpenses = (
  userId,
  categories,
  from,
  to,
) => {
  const lookedForExp = expenses.filter(expense => {
    if (categories.inclused(expense.category)
        && expense.userId === userId
        && expense.spentAt <= to
        && expense.spentAt >= from) {
      return expense;
    }
  });

  return lookedForExp;
};

const createExpense = (
  userId,
  title,
  spentAt,
  category,
  amount,
  note = '',
) => {
  const expense = {
    id: v4(),
    userId,
    title,
    spentAt,
    category,
    amount,
    note,
  };

  expenses.push(expense);

  return expense;
};

const getExpense = (id) => {
  return expenses.find(expense => expense.id === id) || null;
};

const deleteExpense = (id) => {
  const newExpense = expenses.filter(expense => expense.id !== id);

  expenses = newExpense;
};

const updateExpense = ({
  id,
  title,
  spentAt,
  category,
  amount,
  note,
}) => {
  const expense = getExpense(id);

  Object.assign(expense, {
    title,
    spentAt,
    category,
    amount,
    note,
  });

  return expense;
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
