'use strict';

const { v4: uuidv4 } = require('uuid');

let expenses = [];

function getExpenses() {
  return expenses;
};

function filterByDate(start, end) {
  const userExpenses = expenses
    .filter(expense => expense.spentAt > start && expense.spentAt < end);

  return userExpenses;
}

function filterById(expenseId) {
  const expensesById = expenses
    .filter(expense => expense.id !== expenseId);

  return expensesById;
}

function getExpenseById(expenseId) {
  const neededExpense = expenses.find(expense => expense.id === expenseId);

  return neededExpense || null;
}

function createExpense(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const newExpense = {
    id: uuidv4(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function removeExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== expenseId);
}

function updateExpense(expenseId, title) {
  const expense = getExpenseById(expenseId);

  Object.assign(expense, { title });

  return expense;
}

module.exports = {
  getExpenses,
  filterByDate,
  filterById,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
