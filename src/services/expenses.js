'use strict';

const { createNewId } = require('../utils/createNewId');

let expenses = [];

const setInitialExpenses = (initialExpenses) => {
  expenses = initialExpenses;

  return expenses;
};

const getAll = (params) => {
  const {
    userId,
    categories,
    from,
    to,
  } = params;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense =>
      expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(expense =>
      categories.includes(expense.category)
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(expense =>
      expense.spentAt >= from,
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(expense =>
      expense.spentAt <= to,
    );
  }

  return filteredExpenses;
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

const addNewExpense = (expense) => {
  const newExpense = {
    ...expense,
    id: createNewId(expenses),
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const updateExpense = (expenseId, newExpenseData) => {
  const expenseToUpdate = getExpenseById(+expenseId);
  const updatedExpense = Object.assign(expenseToUpdate, newExpenseData);

  return updatedExpense;
};

module.exports = {
  setInitialExpenses,
  getAll,
  getExpenseById,
  addNewExpense,
  deleteExpense,
  updateExpense,
};
