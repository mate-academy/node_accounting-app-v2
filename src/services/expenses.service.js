'use strict';

const { getNextId } = require('../utils/getNextId');

let expenses = [];

const getAllExpenses = () => expenses;
const getExpenseById = (id) => expenses.find(e => e.id === +id) || null;
const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
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
const deleteExpense = (id) => {
  expenses = expenses.filter(e => e.id !== +id);
};
const updateExpense = (id, title) => {
  const expense = getExpenseById(id);

  if (expense) {
    expense.title = title;
  }

  return expense;
};
const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  clearExpenses,
};
