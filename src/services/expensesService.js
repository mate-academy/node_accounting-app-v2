'use strict';

let expensesData = [];

function getExpenses() {
  return expensesData;
}

function filterByTime(from, to) {
  const userExpenses = expensesData
    .filter(expense => expense.spentAt > from
      && expense.spentAt < to);

  return userExpenses;
}

function findUserExpenses(id, category) {
  let userExpenses = expensesData
    .filter(expense => expense.userId === id);

  if (category) {
    userExpenses = expensesData
      .filter(expense => expense.category === category);
  }

  return userExpenses;
}

function getExpenseById(expenseId) {
  const foundExpense = expensesData
    .find(expense => expense.id === expenseId);

  return foundExpense || null;
}

function createNewExpense(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const newExpense = {
    id: Math.floor(Date.now() * Math.random()),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expensesData.push(newExpense);

  return newExpense;
}

function updateExpense(expenseId, title) {
  const expense = getExpenseById(expenseId);

  Object.assign(expense, { title });

  return expense;
}

function removeExpense(expenseId) {
  const filteredExpenses = expensesData
    .filter(expense => expense.id !== expenseId);

  return filteredExpenses;
}

function filterExpensesById(expenseId) {
  const filteredExpenses = expensesData
    .filter(expense => expense.id !== expenseId);

  expensesData = filteredExpenses;

  return filteredExpenses;
}

function deleteAll() {
  expensesData = [];
}

module.exports = {
  getExpenses,
  filterByTime,
  findUserExpenses,
  getExpenseById,
  createNewExpense,
  updateExpense,
  removeExpense,
  filterExpensesById,
  deleteAll,
};
