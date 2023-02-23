'use strict';

const { generateId } = require('../helpers/generateId');

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

function getAll(query) {
  const { userId, category, from, to } = query;

  let filteredExpenses = expenses;

  if (!filteredExpenses.length) {
    return [];
  }

  filteredExpenses = filteredExpenses.filter((expense) =>
    (!userId || expense.userId === Number(userId))
    && (!category || category.includes(expense.category))
    && (!from || expense.spentAt >= from)
    && (!to || expense.spentAt <= to)
  );

  return filteredExpenses;
}

function getExpenseById(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function createExpense(expenseData) {
  const newId = generateId(expenses);

  const newExpense = {
    id: newId,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

function removeExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));
}

function updateExpense({ expenseId, title }) {
  const expense = getExpenseById(expenseId);

  Object.assign(expense, { title });

  return expense;
}

module.exports = {
  getAll,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
  clearExpenses,
};
