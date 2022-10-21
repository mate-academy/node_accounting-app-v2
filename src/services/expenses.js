'use strict';

function getExpenseById(expenses, id) {
  const foundExpense = expenses.find(expense => expense.id === +id);

  return foundExpense || null;
}

function removeExpense(expenses, id) {
  const newExpenses = expenses.filter((expense) => expense.id !== id);

  return newExpenses;
}

function updateExpense(expenses, id, body) {
  const foundExpense = getExpenseById(expenses, id);

  if (foundExpense) {
    Object.assign(foundExpense, body);

    return foundExpense;
  } else {
    return null;
  }
}

function createExpense(expenses, userId, spentAt,
  title, amount, category, note) {
  const newExpenses = {
    id: Math.random(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpenses);

  return newExpenses;
}

function getExpenseByUser(expenses, id) {
  const filteredExpenses = expenses
    .filter(expense => expense.userId === id);

  return filteredExpenses;
}

function getExpensesByCat(expenses, category) {
  const filteredExpenses = expenses
    .filter(expense => expense.category === category);

  return filteredExpenses;
}

function getExpenseByTime(expenses, from, to) {
  const newExpenses = expenses.filter(
    (expense) => expense.spentAt >= from && expense.spentAt <= to);

  return newExpenses;
}

module.exports = {
  getExpenseById,
  removeExpense,
  updateExpense,
  createExpense,
  getExpenseByUser,
  getExpensesByCat,
  getExpenseByTime,
};
