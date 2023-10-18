/* eslint-disable no-param-reassign */
'use strict';

let nextExpenseId = 1;

function getExpenseById(expenses, id) {
  return expenses.find(expense => expense.id === id) || null;
}

function updateExpense(expenses, id, updates) {
  const foundExpense = getExpenseById(expenses, id);

  if (foundExpense) {
    Object.assign(foundExpense, updates);

    return foundExpense;
  } else {
    return null; // Expense not found
  }
}

function createExpense(
  expenses,
  userId,
  spentAt,
  title,
  amount,
  category,
  note) {
  const newExpense = {
    id: nextExpenseId++,
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

function getExpenseByUser(expenses, userId) {
  return expenses.filter(expense => expense.userId === userId);
}

function getExpensesByCat(expenses, category) {
  return expenses.filter(expense => expense.category === category);
}

function getExpenseByTime(expenses, from, to) {
  from = new Date(from); // Convert from and to to Date objects
  to = new Date(to);

  return expenses.filter(expense => {
    const spentAt = new Date(expense.spentAt);

    return spentAt >= from && spentAt <= to;
  });
}

module.exports = {
  getExpenseById,
  updateExpense,
  createExpense,
  getExpenseByUser,
  getExpensesByCat,
  getExpenseByTime,
};
