/* eslint-disable max-len */
'use strict';

const { generateId } = require('../generateId');

let expenses = [];

function getAllExpenses({ userId, categories, from, to }) {
  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter(expense => categories.includes(expense.category));
  }

  if (from) {
    expenses = expenses.filter(expense => expense.spentAt >= from);
  }

  if (to) {
    expenses = expenses.filter(expense => expense.spentAt <= to);
  }

  return expenses;
};

function getExpenseById(expenseId) {
  return expenses.find(expense => expense.id === +expenseId);
};

function addExpense(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const newExpense = {
    id: generateId(expenses),
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

function removeExpense(expenseId) {
  expenses = expenses.filter(experse => experse.id !== +expenseId);
};

function updateExpenseInfo(expenseId, body) {
  const foundExpense = getExpenseById(expenseId);

  Object.entries(body).map(([key, value]) => {
    if (Object.keys(foundExpense).includes(key) && typeof foundExpense[key] === typeof value) {
      Object.assign(foundExpense, {
        [key]: value,
      });
    }
  });

  return foundExpense;
};

function clearExpenses() {
  expenses = [];
};

const expensesService = {
  getAllExpenses, getExpenseById, addExpense, removeExpense, updateExpenseInfo, clearExpenses,
};

module.exports = { expensesService };
