'use strict';

let nextExpenseId = 1;

let expenses = [];

const getExpensesData = () => {
  return expenses;
};

const clearExpensesArray = () => {
  expenses = [];
};

function postExpense(body) {
  const expense = {
    id: nextExpenseId++,
    ...body,
  };

  expenses.push(expense);

  return expense;
}

function getExpenses() {
  return expenses;
}

function getExpenseById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function deleteExpense(expenseId) {
  const newExpenses = expenses.filter(expense => expense.id !== +expenseId);

  expenses = newExpenses;

  return newExpenses;
}

function updateExpense(foundExpense, title) {
  Object.assign(foundExpense, { title });
}

module.exports = {
  postExpense,
  getExpenseById,
  getExpenses,
  deleteExpense,
  updateExpense,
  getExpensesData,
  clearExpensesArray,
};
