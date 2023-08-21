'use strict';

let expenses = [];
let currentExpenseId = 1;

function getAllExpenses({ userId, categories, from, to }) {
  if (categories) {
    expenses = expenses.filter((expanse) => {
      return categories.includes(expanse.category);
    });
  }

  if (userId) {
    expenses = expenses.filter((expense) => {
      return expense.userId === +userId;
    });
  }

  if (from && to) {
    expenses = expenses.filter((expense) => {
      return expense.spentAt >= from && expense.spentAt <= to;
    });
  }

  return expenses;
};

function getByExpenseId(expenseId) {
  const foundExpense = expenses.find((expense) => +expense.id === +expenseId);

  return foundExpense || null;
}

function createExpense({ userId, spentAt, title, amount, category, note }) {
  const newExpense = {
    id: currentExpenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);
  currentExpenseId++;

  return newExpense;
}

function removeExpense(expenseId) {
  expenses = expenses.filter((expense) => +expense.id !== +expenseId);
}

function updateExpense(id, body) {
  const foundExpense = getByExpenseId(id);

  Object.assign(foundExpense, body);

  return foundExpense;
}

function removeAllExpenses() {
  expenses = [];
}

module.exports = {
  getAllExpenses,
  getByExpenseId,
  createExpense,
  removeExpense,
  updateExpense,
  removeAllExpenses,
};
