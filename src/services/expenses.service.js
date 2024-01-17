'use strict';

let expenses = [];
let countIdExpenses = 1;

const getAllExpenses = ({ userId, categories, from, to }) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from && expense.spentAt <= to);
  }

  return filteredExpenses;
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

const createNewExpense = (
  {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }) => {
  const newExpense = {
    id: countIdExpenses,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);
  countIdExpenses++;

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const updateExpense = ({ id, body }) => {
  const expense = getExpenseById(id);

  Object.assign(expense, body);

  return expense;
};

const resetExpenses = () => {
  expenses = [];
  countIdExpenses = 0;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createNewExpense,
  removeExpense,
  updateExpense,
  resetExpenses,
};
