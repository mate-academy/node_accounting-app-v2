'use strict';

let expenses = [];

function getExpenses() {
  return expenses;
}

function getExpensesById(expensesId) {
  const foundExpense = expenses.find((expense) => expense.id === +expensesId);

  return foundExpense || null;
}

function getExpenseByCategory(category) {
  const categoryExpenses = expenses
    .filter(expense => expense.category === category);

  return categoryExpenses;
}

function getExpenseByUser(id) {
  const userExpenses = expenses.filter(expense => expense.userId === +id);

  return userExpenses;
}

function getExpensesBetweenDates(from, to) {
  const expensesBetweenDates = expenses
    .filter((expense) => expense.spentAt >= from && expense.spentAt <= to);

  return expensesBetweenDates;
}

function createExpense(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const newExpenses = {
    id: Math.round(Math.random() * 100),
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

function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== +id);
}

function updateExpense(expense, expenseKey) {
  Object.assign(expense, expenseKey);
}

function initExpense() {
  expenses = [];
}

module.exports = {
  getExpenses,
  updateExpense,
  deleteExpense,
  createExpense,
  getExpensesBetweenDates,
  getExpenseByUser,
  getExpenseByCategory,
  getExpensesById,
  initExpense,
};
