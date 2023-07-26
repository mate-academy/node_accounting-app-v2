'use strict';

const { filterExpenses, getNewId, findById } = require('../helpers');

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getFiltered = (requestQuery) => filterExpenses(expenses, requestQuery);

const getExpenseById = (expenseId) => (
  findById(expenses, Number(expenseId))
);

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpense = {
    id: getNewId(expenses),
    userId: Number(userId),
    spentAt: new Date(spentAt),
    title,
    amount,
    category,
    note: note || null,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));

  return expenses;
};

const updateExpense = (expenseId, updateData) => {
  const expense = getExpenseById(expenseId);

  Object.assign(expense, updateData);

  return expense;
};

module.exports = {
  clearExpenses,
  getFiltered,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
