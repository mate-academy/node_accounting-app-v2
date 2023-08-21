'use strict';

let expenses = [];
let countIdExpenses = 1;

function resetAllExpenses() {
  expenses = [];
}

function getAllExpenses({ userId, categories, from, to }) {
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
}

function getExpenseById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function createNewExpense(
  {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }
) {
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
}

function removeExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function updateExpense({ id, body }) {
  const expense = getExpenseById(id);

  Object.assign(expense, body);

  return expense;
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createNewExpense,
  removeExpense,
  updateExpense,
  resetAllExpenses,
};
