'use strict';

const { getNextId } = require('../utils/getNextId');

let expenses = [];

const getAllExpenses = (userId, from, to, categories) => {
  if (userId) {
    expenses = expenses.filter(item => item.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter(item => item.category === categories);
  }

  if (from) {
    expenses = expenses.filter(item => (item.spentAt > from));
  }

  if (to) {
    expenses = expenses.filter(item => (item.spentAt < to));
  }

  return expenses;
};

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpense = {
    id: getNextId(expenses),
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

const getExpenseById = (id) => {
  const expense = expenses.find(item => item.id === id);

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter(item => item.id !== id);
};

const updateExpense = ({
  id,
  title,
}) => {
  const expense = getExpenseById(id);

  if (!expense) {
    return { errorCode: 404 };
  }

  Object.assign(expense, {
    title,
  });

  return expense;
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  expenses,
  getAllExpenses,
  getExpenseById,
  clearExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
};
