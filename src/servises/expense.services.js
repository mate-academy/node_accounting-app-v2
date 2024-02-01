'use strict';

let expenses = [];

const getAllExpenses = (req) => {
  const { userId, categories, from, to } = req.query;
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === categories);
  };

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

const getExpenseById = (id) => expenses.find(expense => expense.id === id);

const createExpense = (req) => {
  const expense = req.body;

  const newExpense = {
    id: Date.now(),
    ...expense,
  };

  expenses = [...expenses, newExpense];

  return newExpense;
};

const updateExpense = (id, expense) => {
  const currentExp = getExpenseById(+id);

  if (!currentExp) {
    return;
  }

  Object.assign(currentExp, { ...expense });

  return currentExp;
};

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);

  return expenses;
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  resetExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
