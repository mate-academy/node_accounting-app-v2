'use strict';

const generateUnicId = require('../utils/generateUnicId');

let expenses = [];

const getInitiallExpenses = () => {
  expenses = [];
};

const getAll = (
  userId,
  categories,
  from,
  to,
) => {
  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter(expense => expense.category === categories);
  }

  if (from) {
    expenses = expenses.filter(expense => expense.spentAt > from);
  }

  if (to) {
    expenses = expenses.filter(expense => expense.spentAt < to);
  }

  return expenses;
};

const getById = (expenseId) => {
  const foundedExpense = expenses.find(expense => expense.id === +expenseId);

  return foundedExpense || null;
};

const createOne = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const id = generateUnicId();

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

const deleteOne = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const updateOne = ({ expenseId, requiredParams }) => {
  const updatedExpense = getById(expenseId);

  Object.assign(updatedExpense, requiredParams);

  return updatedExpense;
};

module.exports = {
  getInitiallExpenses,
  getAll,
  getById,
  createOne,
  deleteOne,
  updateOne,
};
